import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты и соцсети — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Почтовые адреса и ссылки соцсетей на сайте Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminContacts,
});

function AdminContacts() {
  return (
    <AdminShell title="Контакты и соцсети">
      <AdminItems
        kind="contact"
        title="Почтовые адреса"
        intro="Эти адреса показываются на странице «Контакты». Первый адрес (концерты) также стоит внизу каждой страницы сайта. Подписи блоков меняются в разделе «Тексты сайта» → «Контакты»."
        addLabel="Добавить адрес"
        slugPrefix="contact"
        titleField="email"
        fields={[
          {
            name: "email",
            label: "Адрес почты",
            hint: "Например concerts@moshearielganelin.com. У исходных адресов меняйте только саму почту — подписи на сайте останутся прежними.",
            placeholder: "name@moshearielganelin.com",
          },
        ]}
      />

      <AdminItems
        kind="social"
        title="Ссылки на соцсети"
        intro="Эти ссылки видны в меню, внизу каждой страницы и на странице «Контакты». У известных сетей (YouTube, Instagram, Facebook) показывается значок, у остальных — текстовая ссылка."
        addLabel="Добавить соцсеть"
        slugPrefix="social"
        titleField="label"
        subtitleField="url"
        fields={[
          {
            name: "network",
            label: "Соцсеть",
            hint: "От этого выбора зависит значок на сайте.",
            options: [
              { value: "youtube", label: "YouTube" },
              { value: "instagram", label: "Instagram" },
              { value: "facebook", label: "Facebook" },
              { value: "other", label: "Другая (без значка)" },
            ],
          },
          { name: "label", label: "Название", placeholder: "YouTube" },
          {
            name: "url",
            label: "Ссылка",
            hint: "Полный адрес страницы, начиная с https://",
            placeholder: "https://youtube.com/@mosheganelin",
          },
        ]}
      />
    </AdminShell>
  );
}
