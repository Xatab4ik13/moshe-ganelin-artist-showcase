import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { AdminButton, AdminCard } from "./AdminShell";
import type { AdminField } from "@/lib/admin-fields";
import { adminSaveText, type AdminTextRow } from "@/lib/admin.functions";
import type { Lang } from "@/lib/i18n";

const langLabels: { code: Lang; label: string }[] = [
  { code: "en", label: "Английский (основной)" },
  { code: "es", label: "Испанский" },
  { code: "pt", label: "Португальский" },
];

export function FieldEditor({ field, row }: { field: AdminField; row: AdminTextRow }) {
  const save = useServerFn(adminSaveText);
  const [values, setValues] = useState<Record<Lang, string>>({
    en: row.values.en ?? row.defaults.en,
    es: row.values.es ?? row.defaults.es,
    pt: row.values.pt ?? row.defaults.pt,
  });
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (state !== "saved") return;
    const timer = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  const saveAll = async () => {
    setState("saving");
    try {
      for (const { code } of langLabels) {
        await save({ data: { key: row.key, lang: code, value: values[code] } });
      }
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  const resetAll = () => {
    setValues({ en: row.defaults.en, es: row.defaults.es, pt: row.defaults.pt });
  };

  return (
    <AdminCard>
      <h3 className="text-lg font-bold text-[#0d3f8f]">{field.label}</h3>
      {field.hint ? <p className="mt-1 text-base text-[#41566f]">{field.hint}</p> : null}

      <div className="mt-4 space-y-4">
        {langLabels.map(({ code, label }) => (
          <label key={code} className="block">
            <span className="text-base font-semibold text-[#123a6b]">{label}</span>
            {field.multiline ? (
              <textarea
                rows={4}
                value={values[code]}
                onChange={(event) => setValues((prev) => ({ ...prev, [code]: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]"
              />
            ) : (
              <input
                type="text"
                value={values[code]}
                onChange={(event) => setValues((prev) => ({ ...prev, [code]: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]"
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <AdminButton onClick={saveAll} disabled={state === "saving"}>
          {state === "saving" ? "Сохраняем…" : "Сохранить"}
        </AdminButton>
        <AdminButton tone="quiet" onClick={resetAll}>
          Вернуть как было
        </AdminButton>
        {state === "saved" ? <span className="text-base font-semibold text-[#127a3d]">Сохранено</span> : null}
        {state === "error" ? (
          <span className="text-base font-semibold text-[#b42318]">Не удалось сохранить</span>
        ) : null}
      </div>
    </AdminCard>
  );
}

