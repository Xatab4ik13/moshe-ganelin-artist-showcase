import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminCard, AdminShell } from "@/components/admin/AdminShell";
import { FieldEditor } from "@/components/admin/TextFieldEditor";
import { adminGroups } from "@/lib/admin-fields";
import { adminGetTexts } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/biography")({
  head: () => ({
    meta: [
      { title: "Биография — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Редактирование страницы биографии Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminBiography,
});

function AdminBiography() {
  const rows = useQuery({ queryKey: ["admin-texts"], queryFn: () => adminGetTexts() });
  const group = adminGroups.find((item) => item.id === "about")!;

  return (
    <AdminShell title="Биография">
      <AdminCard>
        <p className="text-base text-[#41566f]">
          Все тексты страницы Biography: абзацы биографии, цитата, этапы пути и хронология — на трёх языках.
        </p>
      </AdminCard>
      {rows.isLoading ? <p className="text-base text-[#41566f]">Загрузка…</p> : null}
      {rows.error ? (
        <AdminCard>
          <p className="text-base font-semibold text-[#b42318]">Не удалось загрузить тексты.</p>
        </AdminCard>
      ) : null}
      {rows.data
        ? group.fields.map((field) => {
            const row = rows.data.find((item) => item.key === field.key);
            return row ? <FieldEditor key={field.key} field={field} row={row} /> : null;
          })
        : null}
      <AdminItems
        kind="publication"
        title="Хронология (Chronology)"
        intro="Список внизу страницы Biography. Слева жирным — год и месяц, в середине — текст события, справа — город."
        addLabel="Добавить событие"
        slugPrefix="event"
        titleField="title"
        subtitleField="source"
        fields={[
          { name: "title", label: "Год и месяц — EN", placeholder: "2000, April" },
          { name: "title_es", label: "Год и месяц — ES", hint: "Если пусто — будет английский текст.", placeholder: "2000, abril" },
          { name: "title_pt", label: "Год и месяц — POR", hint: "Если пусто — будет английский текст.", placeholder: "2000, abril" },
          { name: "source", label: "Текст события — EN", textarea: true },
          { name: "source_es", label: "Текст события — ES", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "source_pt", label: "Текст события — POR", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "year", label: "Город — EN", hint: "Необязательно.", placeholder: "Tel Aviv" },
          { name: "year_es", label: "Город — ES", hint: "Если пусто — будет английский текст." },
          { name: "year_pt", label: "Город — POR", hint: "Если пусто — будет английский текст." },
        ]}
      />
    </AdminShell>
  );
}
