import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/improvisations")({
  head: () => ({
    meta: [
      { title: "Импровизации — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Импровизации на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <AdminShell title="Импровизации">
      <AdminItems
        kind="improvisation"
        title="Импровизации"
        intro="Раздел Ganelin's music — Improvisations. Каждая запись — видео с названием и описанием."
        addLabel="Добавить импровизацию"
        slugPrefix="improvisation"
        titleField="title"
        fields={[
          { name: "title", label: "Название" },
          {
            name: "videoId",
            label: "Код видео на YouTube",
            hint: "Только код после v= в адресе ролика.",
            placeholder: "dQw4w9WgXcQ",
          },
          { name: "description", label: "Описание — EN (английский)", hint: "Необязательно.", textarea: true },
          { name: "description_es", label: "Описание — ES (испанский)", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "description_pt", label: "Описание — POR (португальский)", hint: "Если пусто — будет английский текст.", textarea: true },
        ]}
      />
    </AdminShell>
  );
}
