import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { AdminCard, AdminShell } from "@/components/admin/AdminShell";
import { FieldEditor } from "@/components/admin/TextFieldEditor";
import { adminGroups } from "@/lib/admin-fields";
import { adminGetTexts } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/texts")({
  head: () => ({
    meta: [
      { title: "Тексты сайта — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Редактирование текстов сайта Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminTexts,
});

function AdminTexts() {
  const rows = useQuery({ queryKey: ["admin-texts"], queryFn: () => adminGetTexts() });

  return (
    <AdminShell title="Тексты сайта">
      <nav
        aria-label="Разделы текстов"
        className="sticky top-0 z-10 -mx-2 flex flex-wrap gap-2 rounded-xl border border-[#bcd6f3] bg-[#eaf3fd] p-2 shadow-sm"
      >
        {adminGroups.map((group) => (
          <a
            key={group.id}
            href={`#texts-${group.id}`}
            className="shrink-0 rounded-lg bg-white px-4 py-2 text-base font-semibold text-[#0d3f8f] outline-none transition hover:bg-[#1b63d8] hover:text-white focus-visible:bg-[#1b63d8] focus-visible:text-white"
          >
            {group.title}
          </a>
        ))}
      </nav>

      {rows.isLoading ? <p className="text-base text-[#41566f]">Загрузка…</p> : null}
      {rows.error ? (
        <AdminCard>
          <p className="text-base font-semibold text-[#b42318]">Не удалось загрузить тексты.</p>
        </AdminCard>
      ) : null}

      {rows.data
        ? adminGroups.map((group) => (
            <section key={group.id} id={`texts-${group.id}`} className="scroll-mt-24 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0d3f8f]">{group.title}</h2>
                <p className="mt-1 text-base text-[#41566f]">{group.description}</p>
              </div>
              {group.fields.map((field) => {
                const row = rows.data.find((item) => item.key === field.key);
                if (!row) return null;
                return <FieldEditor key={field.key} field={field} row={row} />;
              })}
            </section>
          ))
        : null}
    </AdminShell>
  );
}
