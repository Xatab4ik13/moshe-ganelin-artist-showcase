import type { DictKey } from "./i18n";

export type AdminField = {
  key: DictKey;
  label: string;
  hint?: string;
  multiline?: boolean;
};

export type AdminGroup = {
  id: string;
  title: string;
  description: string;
  fields: AdminField[];
};

/** Этап 1 — тексты Главной страницы. */
export const adminGroups: AdminGroup[] = [
  {
    id: "home",
    title: "Главная страница",
    description: "Заголовки разделов и подписи ссылок на главной странице сайта.",
    fields: [
      {
        key: "homeUpcoming",
        label: "Заголовок раздела с концертами",
        hint: "Большой заголовок над карточками ближайших концертов. Сейчас: «Upcoming concerts».",
      },
      {
        key: "homeAllConcerts",
        label: "Ссылка «весь календарь»",
        hint: "Ссылка справа от заголовка концертов, ведёт на страницу афиши.",
      },
      {
        key: "homePress",
        label: "Заголовок раздела «Пресса»",
        hint: "Большой заголовок над карточками статей.",
      },
      {
        key: "homePressAll",
        label: "Ссылка «все материалы прессы»",
        hint: "Ссылка справа от заголовка прессы.",
      },
      {
        key: "homeVideo",
        label: "Заголовок раздела с видео",
        hint: "Большой заголовок над видеороликами (тёмный блок).",
      },
      {
        key: "homeVideoAll",
        label: "Ссылка на канал YouTube",
        hint: "Ссылка справа от заголовка видео.",
      },
    ],
  },
];

export const adminFieldKeys: string[] = adminGroups.flatMap((group) =>
  group.fields.map((field) => field.key as string),
);

export function findAdminGroup(id: string): AdminGroup | undefined {
  return adminGroups.find((group) => group.id === id);
}
