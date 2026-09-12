import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

import { AdminButton, AdminCard } from "./AdminShell";
import { adminDeleteItem, adminGetItems, adminResetItem, adminSaveItem } from "@/lib/admin.functions";
import {
  defaultItems,
  makeItemSlug,
  type ItemKind,
  type ItemOverride,
  type SiteItem,
} from "@/lib/site-items";

export type ItemField = {
  name: string;
  label: string;
  hint?: string;
  textarea?: boolean;
  placeholder?: string;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]";

type FormState = { slug: string; originalSlug: string; data: Record<string, string> };

/** Универсальный список записей (видео, статьи в прессе, публикации). */
export function AdminItems({
  kind,
  title,
  intro,
  addLabel,
  fields,
  titleField,
  subtitleField,
  slugPrefix,
}: {
  kind: ItemKind;
  title: string;
  intro: string;
  addLabel: string;
  fields: ItemField[];
  titleField: string;
  subtitleField?: string;
  slugPrefix: string;
}) {
  const load = useServerFn(adminGetItems);
  const save = useServerFn(adminSaveItem);
  const remove = useServerFn(adminDeleteItem);
  const reset = useServerFn(adminResetItem);

  const query = useQuery({ queryKey: ["admin-items"], queryFn: () => load(), staleTime: 0 });
  const [form, setForm] = useState<FormState | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const overrides = (query.data ?? []) as ItemOverride[];
  const list = useMemo(() => {
    const rows = overrides.filter((row) => row.kind === kind);
    const bySlug = new Map(rows.map((row) => [row.slug, row]));
    const result: SiteItem[] = [];
    for (const base of defaultItems[kind]) {
      const row = bySlug.get(base.slug);
      bySlug.delete(base.slug);
      if (row?.hidden) continue;
      const data = { ...base.data };
      for (const [key, value] of Object.entries(row?.data ?? {})) {
        if (value.trim().length > 0) data[key] = value;
      }
      result.push({ kind, slug: base.slug, data, isDefault: true });
    }
    for (const row of [...bySlug.values()].filter((row) => !row.hidden)) {
      result.push({ kind, slug: row.slug, data: { ...row.data }, isDefault: false });
    }
    return result;
  }, [overrides, kind]);

  const hiddenDefaults = overrides.filter(
    (row) => row.kind === kind && row.hidden && defaultItems[kind].some((item) => item.slug === row.slug),
  );

  const emptyData = () => Object.fromEntries(fields.map((field) => [field.name, ""]));

  const onSave = async () => {
    if (!form) return;
    const titleValue = (form.data[titleField] ?? "").trim();
    if (titleValue.length === 0) {
      setError("Впишите название.");
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    const slug = form.originalSlug || makeItemSlug(slugPrefix, titleValue);
    const result = await save({
      data: { kind, slug, originalSlug: form.originalSlug, data: form.data, position: list.length },
    });
    setBusy(false);
    if (result.ok) {
      setForm(null);
      setMessage("Готово. Изменения уже видны на сайте.");
      query.refetch();
    } else {
      setError(result.error ?? "Не удалось сохранить.");
    }
  };

  const onDelete = async (item: SiteItem) => {
    const ok = window.confirm(
      item.isDefault ? "Скрыть эту запись с сайта? Её всегда можно вернуть." : "Удалить эту запись навсегда?",
    );
    if (!ok) return;
    await remove({ data: { kind, slug: item.slug, isDefault: item.isDefault } });
    setMessage(item.isDefault ? "Запись скрыта с сайта." : "Запись удалена.");
    query.refetch();
  };

  return (
    <>
      <AdminCard>
        <h2 className="text-xl font-bold text-[#0d3f8f]">{title}</h2>
        <p className="mt-2 text-base text-[#41566f]">{intro}</p>
        <div className="mt-4">
          <AdminButton
            onClick={() => {
              setMessage(null);
              setError(null);
              setForm({ slug: "", originalSlug: "", data: emptyData() });
            }}
          >
            {addLabel}
          </AdminButton>
        </div>
        {message ? <p className="mt-3 text-base font-semibold text-[#12703c]">{message}</p> : null}
        {error ? <p className="mt-3 text-base font-semibold text-[#b3261e]">{error}</p> : null}
      </AdminCard>

      {form ? (
        <AdminCard>
          <h3 className="text-xl font-bold text-[#0d3f8f]">
            {form.originalSlug ? "Изменение записи" : "Новая запись"}
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={field.textarea ? "block md:col-span-2" : "block"}>
                <span className="text-base font-semibold text-[#123a6b]">{field.label}</span>
                {field.hint ? <span className="mt-1 block text-sm text-[#5b7290]">{field.hint}</span> : null}
                {field.textarea ? (
                  <textarea
                    rows={4}
                    value={form.data[field.name] ?? ""}
                    placeholder={field.placeholder ?? ""}
                    onChange={(event) =>
                      setForm({ ...form, data: { ...form.data, [field.name]: event.target.value } })
                    }
                    className={inputClass}
                  />
                ) : (
                  <input
                    type="text"
                    value={form.data[field.name] ?? ""}
                    placeholder={field.placeholder ?? ""}
                    onChange={(event) =>
                      setForm({ ...form, data: { ...form.data, [field.name]: event.target.value } })
                    }
                    className={inputClass}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <AdminButton onClick={onSave} disabled={busy}>
              {busy ? "Сохраняем…" : "Сохранить"}
            </AdminButton>
            <AdminButton tone="quiet" onClick={() => setForm(null)} disabled={busy}>
              Отмена
            </AdminButton>
          </div>
        </AdminCard>
      ) : null}

      {query.isLoading ? <p className="text-base text-[#41566f]">Загрузка…</p> : null}

      <AdminCard>
        <h3 className="text-xl font-bold text-[#0d3f8f]">Список на сайте</h3>
        {list.length === 0 ? <p className="mt-3 text-base text-[#41566f]">Пока пусто.</p> : null}
        <ul className="mt-4 space-y-3">
          {list.map((item) => (
            <li
              key={item.slug}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dbe8f8] bg-[#f7fbff] px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-base font-semibold text-[#0f2744]">{item.data[titleField]}</p>
                {subtitleField ? (
                  <p className="text-sm text-[#5b7290]">{item.data[subtitleField]}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <AdminButton
                  tone="quiet"
                  onClick={() => {
                    setMessage(null);
                    setError(null);
                    setForm({ slug: item.slug, originalSlug: item.slug, data: { ...emptyData(), ...item.data } });
                  }}
                >
                  Изменить
                </AdminButton>
                <AdminButton tone="quiet" onClick={() => onDelete(item)}>
                  {item.isDefault ? "Скрыть" : "Удалить"}
                </AdminButton>
              </div>
            </li>
          ))}
        </ul>
      </AdminCard>

      {hiddenDefaults.length > 0 ? (
        <AdminCard>
          <h3 className="text-xl font-bold text-[#0d3f8f]">Скрытые записи сайта</h3>
          <p className="mt-2 text-base text-[#41566f]">Их можно вернуть обратно одной кнопкой.</p>
          <ul className="mt-4 space-y-3">
            {hiddenDefaults.map((row) => {
              const base = defaultItems[kind].find((item) => item.slug === row.slug)!;
              return (
                <li
                  key={row.slug}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dbe8f8] bg-[#f7fbff] px-4 py-3"
                >
                  <span className="text-base text-[#0f2744]">{base.data[titleField]}</span>
                  <AdminButton
                    tone="quiet"
                    onClick={async () => {
                      await reset({ data: { kind, slug: row.slug } });
                      setMessage("Запись снова видна на сайте.");
                      query.refetch();
                    }}
                  >
                    Вернуть на сайт
                  </AdminButton>
                </li>
              );
            })}
          </ul>
        </AdminCard>
      ) : null}
    </>
  );
}
