import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/videos")({
  head: () => ({
    meta: [
      { title: "Видео — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Добавление и изменение видео на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminVideos,
});

function AdminVideos() {
  return (
    <AdminShell title="Видео">
      <AdminItems
        kind="video"
        title="Ролики с YouTube"
        intro="Эти ролики показываются на Главной и в разделах Improvisations, Transcriptions и Concert videos. Раздел выбирается по названию ролика, поэтому пишите его так же, как на сайте."
        addLabel="Добавить видео"
        slugPrefix="video"
        titleField="title"
        subtitleField="videoId"
        fields={[
          { name: "title", label: "Название ролика", placeholder: "Ganelin — Reger in Harlem" },
          {
            name: "videoId",
            label: "Код видео с YouTube",
            hint: "Только код из адреса, например WBZdF8B2wpU (часть после v=).",
          },
          {
            name: "description",
            label: "Описание",
            hint: "Необязательно. Показывается на странице ролика.",
            textarea: true,
          },
        ]}
      />
    </AdminShell>
  );
}
