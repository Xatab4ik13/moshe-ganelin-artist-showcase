import { createFileRoute } from "@tanstack/react-router";

import { AdminItems } from "@/components/admin/AdminItems";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/photos")({
  head: () => ({
    meta: [
      { title: "Фотогалерея — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Добавление и изменение фотографий галереи сайта Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminPhotos,
});

function AdminPhotos() {
  return (
    <AdminShell title="Фотогалерея">
      <AdminItems
        kind="photo"
        slugPrefix="photo"
        title="Фотографии на странице Photography"
        intro="Здесь можно добавить новые фотографии в галерею, изменить подпись под фотографией, скрыть лишние снимки и вернуть их обратно. Фотографии, которые уже были на сайте, можно заменить в разделе «Фотографии и логотип»."
        addLabel="Добавить фотографию"
        titleField="caption"
        fields={[
          {
            name: "caption",
            label: "Подпись под фотографией",
            hint: "Короткое описание: где и когда сделан снимок.",
          },
          {
            name: "imageUrl",
            label: "Фотография",
            hint: "Выберите файл с компьютера. Подойдут JPG, PNG или WebP до 12 МБ.",
            image: true,
          },
          {
            name: "ratio",
            label: "Форма снимка",
            hint: "Как фотография будет обрезана в галерее.",
            options: [
              { value: "aspect-[4/3]", label: "Горизонтальная" },
              { value: "aspect-[3/4]", label: "Вертикальная" },
              { value: "aspect-[4/5]", label: "Вытянутая вертикально" },
              { value: "aspect-[16/10]", label: "Широкая" },
              { value: "aspect-square", label: "Квадратная" },
            ],
          },
        ]}
      />
    </AdminShell>
  );
}
