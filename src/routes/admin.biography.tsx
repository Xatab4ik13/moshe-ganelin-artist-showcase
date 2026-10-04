import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

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
          Все тексты страницы Biography: абзацы биографии, цитата и этапы пути — на трёх языках. Список публикаций
          редактируется в разделе «Пресса и публикации».
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
    </AdminShell>
  );
}
