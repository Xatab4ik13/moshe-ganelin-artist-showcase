export type Video = { id: string; title: string; description?: string };

export const videos: Video[] = [
  { id: "WBZdF8B2wpU", title: "Ganelin — Reger in Harlem", description: "Описание записи — пример текста." },
  { id: "Q88Nv7ToyN0", title: "Rachmaninoff — Moment musical op. 16 no. 4 (organ)", description: "Описание записи — пример текста." },
  { id: "jNyTRlUBOks", title: "Improvisation on Christmas themes", description: "Описание записи — пример текста." },
  { id: "qnOAs0JhL8w", title: "Louis Vierne — Final, Organ Symphony no. 6 op. 59", description: "Описание записи — пример текста." },
  { id: "yEJB7s02L9c", title: "Ganelin — Organ Symphony No. 4 (2017)", description: "Описание записи — пример текста." },
  { id: "GoNfKFTRTvU", title: "Chopin — Revolutionary Etude on organ", description: "Описание записи — пример текста." },
  { id: "iAKPA7E9fY8", title: "The Celtic Lovesong — concerto for organ and orchestra", description: "Описание записи — пример текста." },
  { id: "2i9yR_80YDI", title: "Prelude and Fugue «Nun komm, der Heiden Heiland»", description: "Описание записи — пример текста." },
  { id: "LaUCiNaGKws", title: "Scriabin — Le Poème de l'Extase", description: "Описание записи — пример текста." },
  { id: "Vs56W0_2n7M", title: "A. Mosolov — Iron Foundry (transcription for organ)", description: "Описание записи — пример текста." },
];

export type Concert = {
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  note?: string;
};

export const upcomingConcerts: Concert[] = [
  { day: "12", month: "сентября", year: "2026", city: "Москва", venue: "Зал имени Рахманинова", title: "Авторский вечер Moshe Ganelin", note: "Программа — пример текста." },
  { day: "14", month: "сентября", year: "2026", city: "Москва", venue: "Кафедральный собор", title: "Органный вечер: от Баха до наших дней", note: "Программа — пример текста." },
  { day: "28", month: "сентября", year: "2026", city: "Санкт-Петербург", venue: "Петрикирхе", title: "Музыка соборов. Сольный концерт", note: "Программа — пример текста." },
  { day: "19", month: "октября", year: "2026", city: "Калининград", venue: "Кафедральный собор", title: "Симфония органа и оркестра", note: "Программа — пример текста." },
  { day: "07", month: "ноября", year: "2026", city: "Казань", venue: "ГБКЗ им. С. Сайдашева", title: "Импровизация: вечер одной темы", note: "Программа — пример текста." },
];

export const archiveConcerts: Concert[] = [
  { day: "22", month: "мая", year: "2026", city: "Иерусалим", venue: "Concert Hall", title: "Vierne / Ganelin" },
  { day: "03", month: "апреля", year: "2026", city: "Берлин", venue: "St. Marienkirche", title: "Bach. Полное собрание хоралов" },
  { day: "11", month: "февраля", year: "2026", city: "Москва", venue: "Дом музыки", title: "Орган и электроника" },
  { day: "09", month: "декабря", year: "2025", city: "Тбилиси", venue: "Кафедральный собор", title: "Рождественская программа" },
];

export type Work = { title: string; year: string; duration: string; links: { label: string; href: string }[] };

export const musicSections: { section: string; description: string; works: Work[] }[] = [
  {
    section: "Органные сочинения",
    description: "Описание раздела — пример текста.",
    works: [
      { title: "Organ Symphony No. 4", year: "2017", duration: "32′", links: [{ label: "Слушать", href: "#" }, { label: "Ноты (PDF)", href: "#" }] },
      { title: "Prelude and Fugue «Nun komm»", year: "2019", duration: "11′", links: [{ label: "Слушать", href: "#" }, { label: "Ноты (PDF)", href: "#" }] },
    ],
  },
  {
    section: "Фортепианная музыка",
    description: "Описание раздела — пример текста.",
    works: [
      { title: "Six Preludes", year: "2021", duration: "18′", links: [{ label: "Слушать", href: "#" }, { label: "Ноты (PDF)", href: "#" }] },
      { title: "Nocturne in memoriam", year: "2023", duration: "7′", links: [{ label: "Слушать", href: "#" }] },
    ],
  },
  {
    section: "Оркестровые и камерные",
    description: "Описание раздела — пример текста.",
    works: [
      { title: "The Celtic Lovesong — концерт для органа с оркестром", year: "2015", duration: "24′", links: [{ label: "Слушать", href: "#" }, { label: "Партитура", href: "#" }] },
      { title: "Quartet «Architecture»", year: "2020", duration: "16′", links: [{ label: "Слушать", href: "#" }] },
    ],
  },
  {
    section: "Транскрипции и импровизации",
    description: "Описание раздела — пример текста.",
    works: [
      { title: "A. Mosolov — Iron Foundry", year: "2018", duration: "9′", links: [{ label: "Слушать", href: "#" }] },
      { title: "Improvisation on Christmas themes", year: "2022", duration: "13′", links: [{ label: "Слушать", href: "#" }] },
    ],
  },
];

export type Post = { slug: string; type: string; date: string; title: string; excerpt: string };

export const posts: Post[] = [
  { slug: "silence", type: "Эссе", date: "18.08.2026", title: "Тишина до первой ноты", excerpt: "Краткое описание материала — пример текста, который будет заменён." },
  { slug: "instrument", type: "Интервью", date: "02.07.2026", title: "Инструмент, который дышит зданием", excerpt: "Краткое описание материала — пример текста, который будет заменён." },
  { slug: "registration", type: "Заметки", date: "14.05.2026", title: "О регистровке: как выбирают краски", excerpt: "Краткое описание материала — пример текста, который будет заменён." },
  { slug: "tour", type: "Дневник", date: "30.03.2026", title: "Гастрольный дневник: три собора за неделю", excerpt: "Краткое описание материала — пример текста, который будет заменён." },
];
