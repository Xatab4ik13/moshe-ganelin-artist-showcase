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

const f = (key: DictKey, label: string, hint?: string, multiline?: boolean): AdminField => ({
  key,
  label,
  ...(hint ? { hint } : {}),
  ...(multiline ? { multiline: true } : {}),
});

/** Все тексты сайта: заголовки, подписи и обычные тексты (сейчас в них стоят примеры). */
export const adminGroups: AdminGroup[] = [
  {
    id: "home",
    title: "Главная страница",
    description: "Заголовки разделов, подписи ссылок и тексты на главной странице.",
    fields: [
      f("homeUpcoming", "Заголовок «Ближайшие концерты»"),
      f("homeAllConcerts", "Ссылка на полный календарь"),
      f("homePress", "Заголовок раздела «Пресса»"),
      f("homePressAll", "Ссылка «все материалы прессы»"),
      f("homeVideo", "Заголовок раздела с видео"),
      f("homeVideoAll", "Ссылка на канал YouTube"),
      f("homeWatch", "Надпись на кнопке видео", "Короткое слово вроде «Watch»."),
      f("programNote", "Текст под программой концерта", "Обычный текст, сейчас это пример.", true),
      f("blockNote", "Общая подпись-описание блока", "Короткий текст под карточками. Сейчас пример.", true),
      f("sectionDescription", "Описание раздела", "Используется в нескольких разделах сайта.", true),
    ],
  },
  {
    id: "concerts",
    title: "Афиша и страница концерта",
    description: "Заголовки и обычные тексты на странице афиши и на страницах отдельных концертов.",
    fields: [
      f("concertsTitle", "Заголовок страницы афиши"),
      f("concertsLead", "Вступительный текст афиши", "Большой текст под заголовком.", true),
      f("concertsPast", "Заголовок «Прошедшие концерты»"),
      f("concertsCalendar", "Слово «Календарь»"),
      f("concertBack", "Ссылка «назад ко всем концертам»"),
      f("concertWhen", "Подпись «Дата»"),
      f("concertWhere", "Подпись «Зал»"),
      f("concertProgram", "Подпись «Программа»"),
      f("concertAbout", "Заголовок «О концерте»"),
      f("concertVideo", "Подпись «Видео»"),
      f("concertDetailsText", "Описание концерта по умолчанию", "Показывается, если у концерта нет своего описания.", true),
      f("concertTickets", "Подпись «Билеты и бронирование»"),
    ],
  },
  {
    id: "about",
    title: "Биография",
    description: "Заголовки и тексты страницы о музыканте.",
    fields: [
      f("aboutTitle", "Заголовок страницы"),
      f("aboutLead", "Вступительный текст о музыканте", "Основной текст под заголовком.", true),
      f("aboutMilestones", "Заголовок «Этапы пути»"),
      f("aboutPublications", "Заголовок «Публикации»"),
    ],
  },
  {
    id: "music",
    title: "Музыка",
    description: "Тексты раздела музыки, списка произведений и страниц отдельных сочинений.",
    fields: [
      f("musicTitle", "Заголовок раздела музыки"),
      f("musicLead", "Вступительный текст раздела", undefined, true),
      f("musicIntroTitle", "Заголовок «О музыке»"),
      f("musicIntroText", "Текст «О музыке»", "Большой вступительный текст о творчестве.", true),
      f("listOfWorks", "Заголовок «Список произведений»"),
      f("catSymphonic", "Раздел «Симфоническая музыка»"),
      f("catOrgan", "Раздел «Органная музыка»"),
      f("catVocal", "Раздел «Вокальная музыка»"),
      f("catChoir", "Раздел «Хоровая музыка»"),
      f("catChamber", "Раздел «Камерная музыка»"),
      f("workBack", "Ссылка «назад к списку произведений»"),
      f("workAbout", "Заголовок «О произведении»"),
      f("workQuotes", "Заголовок «Цитаты»"),
      f("workVideo", "Подпись «Видео»"),
      f("workDetails", "Заголовок «Детали»"),
      f("workPremiere", "Подпись «Премьера»"),
      f("workDuration", "Подпись «Длительность»"),
      f("workScoring", "Подпись «Состав»"),
      f("scorePdf", "Подпись «Партитура (PDF)»"),
      f("fullScore", "Подпись «Полная партитура»"),
      f("musicOrgan", "Подраздел «Органные сочинения»"),
      f("musicOrchestra", "Подраздел «Оркестровое и камерное»"),
      f("musicPiano", "Подраздел «Фортепианная музыка»"),
      f("musicTranscriptions", "Подраздел «Транскрипции и импровизации»"),
      f("musicRecordings", "Подраздел «Записи»"),
    ],
  },
  {
    id: "videos",
    title: "Импровизации, транскрипции, видео концертов",
    description: "Заголовки и вступительные тексты этих трёх страниц.",
    fields: [
      f("improvisationsTitle", "Заголовок «Импровизации»"),
      f("improvisationsLead", "Текст страницы импровизаций", undefined, true),
      f("transcriptionsTitle", "Заголовок «Транскрипции»"),
      f("transcriptionsLead", "Текст страницы транскрипций", undefined, true),
      f("concertsVideoTitle", "Заголовок «Видео концертов»"),
      f("concertsVideoLead", "Текст страницы видео концертов", undefined, true),
    ],
  },
  {
    id: "poetry",
    title: "Поэзия",
    description: "Заголовки и тексты страницы поэзии.",
    fields: [
      f("poetryTitle", "Заголовок страницы поэзии"),
      f("poetryLead", "Вступительный текст страницы", undefined, true),
      f("poetryIntroTitle", "Заголовок «О поэзии»"),
      f("poetryIntroText", "Текст «О поэзии»", "Большой вступительный текст.", true),
      f("poemSampleTitle", "Название стихотворения (пример)"),
      f("poemSampleText", "Текст стихотворения (пример)", undefined, true),
    ],
  },
  {
    id: "press",
    title: "Пресса",
    description: "Заголовки, цитаты и подписи на странице прессы.",
    fields: [
      f("pressTitle", "Заголовок страницы"),
      f("pressLead", "Вступительный текст страницы", undefined, true),
      f("pressQuotes", "Заголовок «В прессе»"),
      f("pressQuoteText", "Цитата из рецензии", undefined, true),
      f("pressQuoteSource", "Название издания"),
      f("readMore", "Подпись «Читать»"),
    ],
  },
  {
    id: "gallery",
    title: "Фотографии",
    description: "Заголовок и подписи страницы с фотографиями.",
    fields: [
      f("galleryTitle", "Заголовок страницы"),
      f("galleryLead", "Текст под заголовком", undefined, true),
    ],
  },
  {
    id: "contacts",
    title: "Контакты",
    description: "Заголовки, тексты и подписи на странице контактов и в подвале сайта.",
    fields: [
      f("contactsTitle", "Заголовок страницы"),
      f("contactsLead", "Вступительный текст страницы", undefined, true),
      f("contactsBooking", "Подпись «Концерты и бронирование»"),
      f("contactsPress", "Подпись «Пресса»"),
      f("contactsScores", "Подпись «Ноты и издания»"),
      f("contactsManagement", "Подпись «Менеджмент»"),
      f("contactsManagementText", "Текст о менеджменте и условиях", undefined, true),
      f("contactsFollow", "Надпись «Следите за Moshe Ariel Ganelin»"),
      f("footerBooking", "Текст в подвале сайта", undefined, true),
    ],
  },
  {
    id: "menu",
    title: "Меню и поиск",
    description: "Названия пунктов меню, языков и подписи поиска.",
    fields: [
      f("navHome", "Пункт меню «Главная»"),
      f("navAbout", "Пункт меню «О музыканте»"),
      f("navBiography", "Пункт меню «Биография»"),
      f("navBio", "Пункт меню «Био»"),
      f("navPublications", "Пункт меню «Публикации»"),
      f("navConcertSchedule", "Пункт меню «Афиша»"),
      f("navMusic", "Пункт меню «Музыка»"),
      f("navGanelinMusic", "Пункт меню «Музыка Ганелина»"),
      f("navGanelinPoetry", "Пункт меню «Поэзия Ганелина»"),
      f("navOrgan", "Пункт меню «Орган»"),
      f("navOrchestra", "Пункт меню «Оркестр»"),
      f("navPiano", "Пункт меню «Фортепиано»"),
      f("navTranscriptions", "Пункт меню «Транскрипции»"),
      f("navImprovisations", "Пункт меню «Импровизации»"),
      f("navRecordings", "Пункт меню «Записи»"),
      f("navConcertsVideo", "Пункт меню «Видео концертов»"),
      f("navPoetry", "Пункт меню «Поэзия»"),
      f("navConcerts", "Пункт меню «Концерты»"),
      f("navPress", "Пункт меню «Пресса»"),
      f("navGallery", "Пункт меню «Фотографии»"),
      f("navContact", "Пункт меню «Контакты»"),
      f("navSearch", "Подпись «Поиск»"),
      f("searchPlaceholder", "Подсказка в поле поиска"),
      f("searchHint", "Подсказка под полем поиска"),
      f("searchNoResults", "Надпись «Ничего не найдено»"),
      f("openMenuShort", "Слово рядом с кнопкой меню"),
      f("openMenu", "Подпись «Открыть меню»"),
      f("closeMenu", "Подпись «Закрыть меню»"),
      f("mainNav", "Название меню для программ чтения с экрана"),
      f("langEnglish", "Название языка «Английский»"),
      f("langSpanish", "Название языка «Испанский»"),
      f("langPortuguese", "Название языка «Португальский»"),
      f("langRussian", "Название языка «Русский»"),
    ],
  },
];

export const adminFieldKeys: string[] = adminGroups.flatMap((group) =>
  group.fields.map((field) => field.key as string),
);

export function findAdminGroup(id: string): AdminGroup | undefined {
  return adminGroups.find((group) => group.id === id);
}
