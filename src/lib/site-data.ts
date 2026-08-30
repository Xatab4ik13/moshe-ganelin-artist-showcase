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
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  note?: string;
};

export const upcomingConcerts: Concert[] = [
  { day: "12", month: "September", year: "2026", city: "Moscow", venue: "Rachmaninoff Hall", title: "An evening with Moshe Ariel Ganelin" },
  { day: "14", month: "September", year: "2026", city: "Moscow", venue: "Cathedral of the Immaculate Conception", title: "Organ evening: from Bach to the present day" },
  { day: "28", month: "September", year: "2026", city: "Saint Petersburg", venue: "Petrikirche", title: "Music of cathedrals. Solo recital" },
  { day: "19", month: "October", year: "2026", city: "Kaliningrad", venue: "Königsberg Cathedral", title: "Symphony of organ and orchestra" },
  { day: "07", month: "November", year: "2026", city: "Kazan", venue: "Saidashev Grand Concert Hall", title: "Improvisation: an evening of a single theme" },
];

export const archiveConcerts: Concert[] = [
  { day: "22", month: "May", year: "2026", city: "Jerusalem", venue: "Concert Hall", title: "Vierne / Ganelin" },
  { day: "03", month: "April", year: "2026", city: "Berlin", venue: "St. Marienkirche", title: "Bach. The complete chorales" },
  { day: "11", month: "February", year: "2026", city: "Moscow", venue: "House of Music", title: "Organ and electronics" },
  { day: "09", month: "December", year: "2025", city: "Tbilisi", venue: "Cathedral", title: "Christmas programme" },
];

export type Work = { title: string; year: string; duration: string; scoreLink?: "pdf" | "full" };

export type MusicSectionId = "organ" | "orchestra" | "piano" | "transcriptions" | "recordings";

export const musicSections: { id: MusicSectionId; works: Work[] }[] = [
  {
    id: "organ",
    works: [
      { title: "Organ Symphony No. 4", year: "2017", duration: "32′", scoreLink: "pdf" },
      { title: "Prelude and Fugue «Nun komm»", year: "2019", duration: "11′", scoreLink: "pdf" },
    ],
  },
  {
    id: "orchestra",
    works: [
      { title: "The Celtic Lovesong — concerto for organ and orchestra", year: "2015", duration: "24′", scoreLink: "full" },
      { title: "Quartet «Architecture»", year: "2020", duration: "16′" },
    ],
  },
  {
    id: "piano",
    works: [
      { title: "Six Preludes", year: "2021", duration: "18′", scoreLink: "pdf" },
      { title: "Nocturne in memoriam", year: "2023", duration: "7′" },
    ],
  },
  {
    id: "transcriptions",
    works: [
      { title: "A. Mosolov — Iron Foundry", year: "2018", duration: "9′" },
      { title: "Improvisation on Christmas themes", year: "2022", duration: "13′" },
    ],
  },
  {
    id: "recordings",
    works: videos.slice(0, 4).map((video, index) => ({
      title: video.title,
      year: String(2024 - index),
      duration: "—",
    })),
  },
];

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
