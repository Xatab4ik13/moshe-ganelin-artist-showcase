import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminCard, AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Панель управления — Moshe Ariel Ganelin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Панель управления сайтом Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  return (
    <AdminShell title="Главная панели">
      <AdminCard>
        <h2 className="text-xl font-bold text-[#0d3f8f]">Добро пожаловать</h2>
        <p className="mt-3 text-base leading-relaxed text-[#41566f]">
          Здесь вы меняете содержимое сайта. Выберите раздел слева, измените нужное поле и нажмите «Сохранить».
          Сайт обновится сразу после сохранения.
        </p>
        <p className="mt-3 text-base leading-relaxed text-[#41566f]">
          В каждом поле уже написан текст, который сейчас стоит на сайте — просто исправьте его. Если очистить
          поле и сохранить, вернётся текст по умолчанию.
        </p>
      </AdminCard>

      <AdminCard>
        <h2 className="text-xl font-bold text-[#0d3f8f]">Что уже готово</h2>
        <ul className="mt-3 space-y-2 text-base text-[#41566f]">
          <li>
            <Link to="/admin/texts" className="font-semibold text-[#1b63d8] underline">
              Тексты главной страницы
            </Link>{" "}
            — заголовки разделов и подписи ссылок.
          </li>
          <li>
            <Link to="/admin/settings" className="font-semibold text-[#1b63d8] underline">
              Смена пароля
            </Link>
            .
          </li>
        </ul>
        <p className="mt-4 text-base text-[#41566f]">
          Дальше добавим: логотип и фотографии, концерты, видео, произведения и остальные страницы.
        </p>
      </AdminCard>
    </AdminShell>
  );
}
