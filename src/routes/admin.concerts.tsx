import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

import { AdminButton, AdminCard, AdminShell } from "@/components/admin/AdminShell";
import {
  adminDeleteConcert,
  adminGetConcerts,
  adminResetConcert,
  adminSaveConcert,
} from "@/lib/admin.functions";
import {
  defaultConcerts,
  makeConcertSlug,
  mergeConcerts,
  type ConcertOverride,
  type SiteConcert,
} from "@/lib/site-concerts";

export const Route = createFileRoute("/admin/concerts")({
  head: () => ({
    meta: [
      { title: "Концерты — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Добавление и изменение концертов на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminConcerts,
});

type FormState = {
  slug: string;
  originalSlug: string;
  kind: "upcoming" | "archive";
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  description: string;
  videoId: string;
  isDefault: boolean;
};

const emptyForm: FormState = {
  slug: "",
  originalSlug: "",
  kind: "upcoming",
  day: "",
  month: "",
  year: "",
  city: "",
  venue: "",
  title: "",
  description: "",
  videoId: "",
  isDefault: false,
};

const inputClass =
  "mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]";

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-base font-semibold text-[#123a6b]">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-[#5b7290]">{hint}</span> : null}
      {textarea ? (
        <textarea
          value={value}
          rows={5}
          placeholder={placeholder ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      )}
    </label>
  );
}

function ConcertForm({
  form,
  setForm,
  onSave,
  onCancel,
  busy,
}: {
  form: FormState;
  setForm: (value: FormState) => void;
  onSave: () => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const set = (key: keyof FormState) => (value: string) => setForm({ ...form, [key]: value });
  return (
    <AdminCard className="mt-6">
      <h2 className="text-xl font-bold text-[#0d3f8f]">
        {form.originalSlug ? "Изменение концерта" : "Новый концерт"}
      </h2>
      <p className="mt-2 text-base text-[#41566f]">
        Заполните поля так, как они должны выглядеть на сайте. Месяц пишется словом по-английски, например September.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Название концерта" value={form.title} onChange={set("title")} placeholder="Organ evening" />
        <label className="block">
          <span className="text-base font-semibold text-[#123a6b]">Раздел</span>
          <span className="mt-1 block text-sm text-[#5b7290]">Предстоящий концерт или уже прошедший (архив).</span>
          <select
            value={form.kind}
            onChange={(event) => setForm({ ...form, kind: event.target.value as FormState["kind"] })}
            className={inputClass}
          >
            <option value="upcoming">Предстоящие концерты</option>
            <option value="archive">Прошедшие концерты</option>
          </select>
        </label>
        <Field label="День" hint="Например 12" value={form.day} onChange={set("day")} />
        <Field label="Месяц" hint="Например September" value={form.month} onChange={set("month")} />
        <Field label="Год" hint="Например 2026" value={form.year} onChange={set("year")} />
        <Field label="Город" value={form.city} onChange={set("city")} placeholder="Moscow" />
        <Field label="Зал или собор" value={form.venue} onChange={set("venue")} placeholder="Rachmaninoff Hall" />
        <Field
          label="Код видео с YouTube"
          hint="Только код из адреса, например WBZdF8B2wpU. Можно оставить пустым."
          value={form.videoId}
          onChange={set("videoId")}
        />
      </div>
      <div className="mt-4">
        <Field
          label="Описание концерта"
          hint="Показывается на странице концерта. Если оставить пустым, будет стандартный текст сайта."
          value={form.description}
          onChange={set("description")}
          textarea
        />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <AdminButton onClick={onSave} disabled={busy}>
          {busy ? "Сохраняем…" : "Сохранить"}
        </AdminButton>
        <AdminButton tone="quiet" onClick={onCancel} disabled={busy}>
          Отмена
        </AdminButton>
      </div>
    </AdminCard>
  );
}

function AdminConcerts() {
  const load = useServerFn(adminGetConcerts);
  const save = useServerFn(adminSaveConcert);
  const remove = useServerFn(adminDeleteConcert);
  const reset = useServerFn(adminResetConcert);

  const query = useQuery({ queryKey: ["admin-concerts"], queryFn: () => load(), staleTime: 0 });
  const [form, setForm] = useState<FormState | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const overrides = (query.data ?? []) as ConcertOverride[];
  const merged = useMemo(() => mergeConcerts(overrides), [overrides]);
  const hiddenDefaults = overrides.filter(
    (row) => row.hidden && defaultConcerts.some((item) => item.slug === row.slug),
  );

  const startEdit = (concert: SiteConcert) => {
    setMessage(null);
    setError(null);
    setForm({
      slug: concert.slug,
      originalSlug: concert.slug,
      kind: concert.kind,
      day: concert.day,
      month: concert.month,
      year: concert.year,
      city: concert.city,
      venue: concert.venue,
      title: concert.title,
      description: concert.description ?? "",
      videoId: concert.videoId ?? "",
      isDefault: concert.isDefault,
    });
  };

  const onSave = async () => {
    if (!form) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    const slug = form.originalSlug || makeConcertSlug(form);
    const result = await save({
      data: {
        slug,
        originalSlug: form.originalSlug,
        kind: form.kind,
        day: form.day,
        month: form.month,
        year: form.year,
        city: form.city,
        venue: form.venue,
        title: form.title,
        description: form.description,
        videoId: form.videoId,
        position: 0,
        hidden: false,
      },
    });
    setBusy(false);
    if (result.ok) {
      setForm(null);
      setMessage("Готово. Концерт сохранён и уже виден на сайте.");
      query.refetch();
    } else {
      setError(result.error ?? "Не удалось сохранить.");
    }
  };

  const onDelete = async (concert: SiteConcert) => {
    const ok = window.confirm(
      concert.isDefault
        ? "Скрыть этот концерт с сайта? Его всегда можно вернуть."
        : "Удалить этот концерт навсегда?",
    );
    if (!ok) return;
    await remove({ data: { slug: concert.slug, isDefault: concert.isDefault } });
    setMessage(concert.isDefault ? "Концерт скрыт с сайта." : "Концерт удалён.");
    query.refetch();
  };

  const section = (title: string, list: SiteConcert[]) => (
    <AdminCard className="mt-6">
      <h2 className="text-xl font-bold text-[#0d3f8f]">{title}</h2>
      {list.length === 0 ? <p className="mt-3 text-base text-[#41566f]">Пока пусто.</p> : null}
      <ul className="mt-4 space-y-3">
        {list.map((concert) => (
          <li
            key={concert.slug}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dbe8f8] bg-[#f7fbff] px-4 py-3"
          >
            <div>
              <p className="text-base font-semibold text-[#0f2744]">{concert.title}</p>
              <p className="text-sm text-[#5b7290]">
                {concert.day} {concert.month} {concert.year} — {concert.city}, {concert.venue}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <AdminButton tone="quiet" onClick={() => startEdit(concert)}>
                Изменить
              </AdminButton>
              <AdminButton tone="quiet" onClick={() => onDelete(concert)}>
                {concert.isDefault ? "Скрыть" : "Удалить"}
              </AdminButton>
            </div>
          </li>
        ))}
      </ul>
    </AdminCard>
  );

  return (
    <AdminShell title="Концерты">
      <AdminCard>
        <p className="text-base text-[#41566f]">
          Здесь собраны все концерты сайта. Нажмите «Изменить», чтобы поправить дату, зал, описание или видео.
          Кнопка «Добавить концерт» создаёт новую афишу и отдельную страницу концерта.
        </p>
        <div className="mt-4">
          <AdminButton
            onClick={() => {
              setMessage(null);
              setError(null);
              setForm({ ...emptyForm });
            }}
          >
            Добавить концерт
          </AdminButton>
        </div>
        {message ? <p className="mt-3 text-base font-semibold text-[#12703c]">{message}</p> : null}
        {error ? <p className="mt-3 text-base font-semibold text-[#b3261e]">{error}</p> : null}
      </AdminCard>

      {form ? (
        <ConcertForm form={form} setForm={setForm} onSave={onSave} onCancel={() => setForm(null)} busy={busy} />
      ) : null}

      {query.isLoading ? <p className="mt-6 text-base text-[#41566f]">Загрузка…</p> : null}

      {section("Предстоящие концерты", merged.upcoming)}
      {section("Прошедшие концерты", merged.archive)}

      {hiddenDefaults.length > 0 ? (
        <AdminCard className="mt-6">
          <h2 className="text-xl font-bold text-[#0d3f8f]">Скрытые концерты сайта</h2>
          <p className="mt-2 text-base text-[#41566f]">Их можно вернуть обратно одной кнопкой.</p>
          <ul className="mt-4 space-y-3">
            {hiddenDefaults.map((row) => {
              const base = defaultConcerts.find((item) => item.slug === row.slug)!;
              return (
                <li
                  key={row.slug}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dbe8f8] bg-[#f7fbff] px-4 py-3"
                >
                  <span className="text-base text-[#0f2744]">
                    {base.title} — {base.day} {base.month} {base.year}
                  </span>
                  <AdminButton
                    tone="quiet"
                    onClick={async () => {
                      await reset({ data: { slug: row.slug } });
                      setMessage("Концерт снова виден на сайте.");
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
    </AdminShell>
  );
}
