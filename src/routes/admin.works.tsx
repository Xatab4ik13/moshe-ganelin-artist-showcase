import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/works")({
  head: () => ({
    meta: [
      { title: "Сочинения — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Список сочинений и страницы произведений Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminWorks,
});

function AdminWorks() {
  return (
    <AdminShell title="Сочинения">
      <AdminItems
        kind="work"
        title="Список сочинений"
        intro="Это раздел Ganelin's music — List of works. У каждого сочинения есть своя страница: название, год, длительность, состав, премьера, описание и видео."
        addLabel="Добавить сочинение"
        slugPrefix="work"
        titleField="title"
        subtitleField="year"
        fields={[
          { name: "title", label: "Название сочинения", placeholder: "“Reger in Harlem” op. 50" },
          {
            name: "category",
            label: "Раздел списка",
            hint: "Куда поставить сочинение в списке произведений.",
            options: [
              { value: "symphonic", label: "Symphonic music" },
              { value: "organ", label: "Organ music" },
              { value: "vocal", label: "Vocal music" },
              { value: "choir", label: "Choir music" },
              { value: "chamber", label: "Chamber music" },
            ],
          },
          { name: "year", label: "Год", placeholder: "2023" },
          { name: "duration", label: "Длительность", hint: "Видна на странице сочинения.", placeholder: "12'" },
          { name: "scoring", label: "Состав (scoring)", placeholder: "organ solo" },
          { name: "premiere", label: "Премьера (premiere data)", placeholder: "2023, Jerusalem" },
          {
            name: "videoId",
            label: "Код видео на YouTube",
            hint: "Необязательно. Только код после v= в адресе ролика.",
            placeholder: "dQw4w9WgXcQ",
          },
          {
            name: "description",
            label: "Описание сочинения — EN (английский)",
            hint: "Необязательно. Показывается на странице сочинения вместо примерного текста.",
            textarea: true,
          },
          {
            name: "description_es",
            label: "Описание сочинения — ES (испанский)",
            hint: "Необязательно. Если пусто — на испанской версии будет английский текст.",
            textarea: true,
          },
          {
            name: "description_pt",
            label: "Описание сочинения — POR (португальский)",
            hint: "Необязательно. Если пусто — на португальской версии будет английский текст.",
            textarea: true,
          },
        ]}
      />
    </AdminShell>
  );
}
