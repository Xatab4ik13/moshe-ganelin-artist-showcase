export type Video = { id: string; title: string; description?: string };

export const videos: Video[] = [
  { id: "WBZdF8B2wpU", title: "Ganelin — Reger in Harlem" },
  { id: "Q88Nv7ToyN0", title: "Rachmaninoff — Moment musical op. 16 no. 4 (organ)" },
  { id: "jNyTRlUBOks", title: "Improvisation on Christmas themes" },
  { id: "qnOAs0JhL8w", title: "Louis Vierne — Final, Organ Symphony no. 6 op. 59" },
  { id: "yEJB7s02L9c", title: "Ganelin — Organ Symphony No. 4 (2017)" },
  { id: "GoNfKFTRTvU", title: "Chopin — Revolutionary Etude on organ" },
  { id: "iAKPA7E9fY8", title: "The Celtic Lovesong — concerto for organ and orchestra" },
  { id: "2i9yR_80YDI", title: "Prelude and Fugue «Nun komm, der Heiden Heiland»" },
  { id: "LaUCiNaGKws", title: "Scriabin — Le Poème de l'Extase" },
  { id: "Vs56W0_2n7M", title: "A. Mosolov — Iron Foundry (transcription for organ)" },
];

export type Concert = {
  slug: string;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  note?: string;
};

export const upcomingConcerts: Concert[] = [
  { slug: "september-12-2026-moscow", day: "12", month: "September", year: "2026", city: "Moscow", venue: "Rachmaninoff Hall", title: "An evening with Moshe Ariel Ganelin" },
  { slug: "september-14-2026-moscow", day: "14", month: "September", year: "2026", city: "Moscow", venue: "Cathedral of the Immaculate Conception", title: "Organ evening: from Bach to the present day" },
  { slug: "september-28-2026-saint-petersburg", day: "28", month: "September", year: "2026", city: "Saint Petersburg", venue: "Petrikirche", title: "Music of cathedrals. Solo recital" },
  { slug: "october-19-2026-kaliningrad", day: "19", month: "October", year: "2026", city: "Kaliningrad", venue: "Königsberg Cathedral", title: "Symphony of organ and orchestra" },
  { slug: "november-7-2026-kazan", day: "07", month: "November", year: "2026", city: "Kazan", venue: "Saidashev Grand Concert Hall", title: "Improvisation: an evening of a single theme" },
];

export const archiveConcerts: Concert[] = [
  { slug: "may-22-2026-jerusalem", day: "22", month: "May", year: "2026", city: "Jerusalem", venue: "Concert Hall", title: "Vierne / Ganelin" },
  { slug: "april-3-2026-berlin", day: "03", month: "April", year: "2026", city: "Berlin", venue: "St. Marienkirche", title: "Bach. The complete chorales" },
  { slug: "february-11-2026-moscow", day: "11", month: "February", year: "2026", city: "Moscow", venue: "House of Music", title: "Organ and electronics" },
  { slug: "december-9-2025-tbilisi", day: "09", month: "December", year: "2025", city: "Tbilisi", venue: "Cathedral", title: "Christmas programme" },
];

export type WorkCategoryId = "symphonic" | "organ" | "vocal" | "choir" | "chamber";

export type CatalogWork = {
  slug: string;
  title: string;
  year: string;
  duration: string;
  scoring: string;
  premiere: string;
  videoId?: string;
};

export const workCategories: { id: WorkCategoryId; works: CatalogWork[] }[] = [
  {
    id: "symphonic",
    works: [
      { slug: "the-celtic-lovesong", title: "The Celtic Lovesong — concerto for organ and orchestra", year: "2015", duration: "24\u2032", scoring: "Organ, symphony orchestra", premiere: "Premiere data — sample", videoId: "iAKPA7E9fY8" },
      { slug: "symphonic-poem-sample", title: "Symphonic poem — sample title", year: "2019", duration: "18\u2032", scoring: "Symphony orchestra", premiere: "Premiere data — sample" },
    ],
  },
  {
    id: "organ",
    works: [
      { slug: "organ-symphony-no-4", title: "Organ Symphony No. 4", year: "2017", duration: "32\u2032", scoring: "Organ solo", premiere: "Premiere data — sample", videoId: "yEJB7s02L9c" },
      { slug: "prelude-and-fugue-nun-komm", title: "Prelude and Fugue \u00abNun komm, der Heiden Heiland\u00bb", year: "2019", duration: "11\u2032", scoring: "Organ solo", premiere: "Premiere data — sample", videoId: "2i9yR_80YDI" },
    ],
  },
  {
    id: "vocal",
    works: [
      { slug: "vocal-cycle-sample", title: "Vocal cycle — sample title", year: "2021", duration: "16\u2032", scoring: "Voice and organ", premiere: "Premiere data — sample" },
    ],
  },
  {
    id: "choir",
    works: [
      { slug: "choir-work-sample", title: "Choral work — sample title", year: "2020", duration: "9\u2032", scoring: "Mixed choir a cappella", premiere: "Premiere data — sample" },
    ],
  },
  {
    id: "chamber",
    works: [
      { slug: "quartet-architecture", title: "Quartet \u00abArchitecture\u00bb", year: "2020", duration: "16\u2032", scoring: "String quartet", premiere: "Premiere data — sample" },
      { slug: "six-preludes", title: "Six Preludes for piano", year: "2021", duration: "18\u2032", scoring: "Piano solo", premiere: "Premiere data — sample" },
    ],
  },
];

export const allWorks: CatalogWork[] = workCategories.flatMap((category) => category.works);

export type PressItem = { slug: string; outlet: string; title: string; date: string; quote: string };

export const pressItems: PressItem[] = [
  { slug: "press-1", outlet: "Publication name — sample", title: "Article headline — sample text", date: "2026", quote: "Quote from the article — sample text, to be replaced." },
  { slug: "press-2", outlet: "Publication name — sample", title: "Article headline — sample text", date: "2025", quote: "Quote from the article — sample text, to be replaced." },
  { slug: "press-3", outlet: "Publication name — sample", title: "Article headline — sample text", date: "2025", quote: "Quote from the article — sample text, to be replaced." },
  { slug: "press-4", outlet: "Publication name — sample", title: "Article headline — sample text", date: "2024", quote: "Quote from the article — sample text, to be replaced." },
];

export const youtubeChannelUrl = "https://www.youtube.com/@mosheganelin";

export const publications: { title: string; source: string; year: string }[] = [
  { title: "Publication title — sample text", source: "Source / journal — sample", year: "2025" },
  { title: "Publication title — sample text", source: "Source / journal — sample", year: "2024" },
  { title: "Publication title — sample text", source: "Source / journal — sample", year: "2023" },
  { title: "Publication title — sample text", source: "Source / journal — sample", year: "2022" },
];

export type PoetryLangId = "russian" | "english" | "spanish" | "portuguese";

export const poetryLangs: { id: PoetryLangId }[] = [
  { id: "russian" },
  { id: "english" },
  { id: "spanish" },
  { id: "portuguese" },
];
