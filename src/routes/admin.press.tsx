import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/press")({
  head: () => ({
    meta: [
      { title: "Пресса и публикации — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Статьи в прессе и публикации на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminPress,
});

function AdminPress() {
  return (
    <AdminShell title="Пресса и публикации">
      <AdminItems
        kind="press"
        title="Статьи в прессе"
        intro="Эти статьи видны в разделе Press и на Главной. Клик по карточке открывает отдельную страницу статьи с полным текстом и ссылкой на источник."
        addLabel="Добавить статью"
        slugPrefix="press"
        titleField="title"
        subtitleField="outlet"
        fields={[
          { name: "title", label: "Заголовок статьи" },
          { name: "outlet", label: "Издание", placeholder: "Название газеты или журнала" },
          { name: "date", label: "Год или дата", placeholder: "2026" },
          { name: "url", label: "Ссылка на статью (веб-источник)", hint: "Необязательно. Полный адрес, начиная с https:// — на странице статьи появится кликабельная ссылка." },
          { name: "quote", label: "Короткая цитата — EN", hint: "Видна на карточке в разделе Press и на Главной.", textarea: true },
          { name: "quote_es", label: "Короткая цитата — ES", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "quote_pt", label: "Короткая цитата — POR", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "body", label: "Полный текст статьи — EN", hint: "Необязательно. Показывается на отдельной странице статьи, куда ведёт клик по карточке.", textarea: true },
          { name: "body_es", label: "Полный текст статьи — ES", hint: "Если пусто — будет английский текст.", textarea: true },
          { name: "body_pt", label: "Полный текст статьи — POR", hint: "Если пусто — будет английский текст.", textarea: true },
        ]}
      />

      <AdminItems
        kind="publication"
        title="Публикации в биографии"
        intro="Список в разделе Biography — Publications."
        addLabel="Добавить публикацию"
        slugPrefix="publication"
        titleField="title"
        subtitleField="source"
        fields={[
          { name: "title", label: "Название публикации" },
          { name: "source", label: "Источник или журнал" },
          { name: "year", label: "Год", placeholder: "2025" },
        ]}
      />
    </AdminShell>
  );
}
