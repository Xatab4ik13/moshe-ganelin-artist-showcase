import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/poetry")({
  head: () => ({
    meta: [
      { title: "Стихи — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Добавление и изменение стихов на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminPoetry,
});

function AdminPoetry() {
  return (
    <AdminShell title="Стихи">
      <AdminItems
        kind="poem"
        slugPrefix="poem"
        title="Стихи на странице Poetry"
        intro="Добавьте стихи. Выберите язык — стихотворение появится в нужном разделе страницы. Пока в разделе нет ни одного стиха, на сайте показывается образец текста."
        addLabel="Добавить стихотворение"
        titleField="title"
        subtitleField="lang"
        fields={[
          {
            name: "lang",
            label: "Язык раздела",
            hint: "В каком разделе страницы Poetry показать стихотворение.",
            options: [
              { value: "russian", label: "Русский" },
              { value: "english", label: "Английский" },
              { value: "spanish", label: "Испанский" },
              { value: "portuguese", label: "Португальский" },
            ],
          },
          { name: "title", label: "Название стихотворения", placeholder: "Например: Осенний свет" },
          {
            name: "text",
            label: "Текст стихотворения",
            hint: "Переносы строк сохраняются так, как вы их напишете.",
            textarea: true,
          },
        ]}
      />
    </AdminShell>
  );
}
