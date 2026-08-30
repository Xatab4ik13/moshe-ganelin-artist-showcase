import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es" | "pt";

export const langOptions: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "POR" },
];

const dict = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navBio: "Bio",
    navPublications: "Publications",
    navMusic: "Music",
    navOrgan: "Organ",
    navOrchestra: "Orchestra",
    navPiano: "Piano",
    navTranscriptions: "Transcriptions",
    navRecordings: "Recordings",
    navPoetry: "Poetry",
    navConcerts: "Concerts",
    navGallery: "Gallery",
    navContact: "Contact",
    langRussian: "Russian",
    langEnglish: "English",
    langSpanish: "Spanish",
    langPortuguese: "Portuguese",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    homeUpcoming: "Upcoming concerts",
    homeAllConcerts: "Full calendar & archive",
    programNote: "Program — sample text.",
    concertsTitle: "Concerts",
    concertsLead: "A catalogue of upcoming performances and an archive of past evenings — sample text.",
    concertsPast: "Past performances",
    aboutTitle: "Biography",
    aboutLead: "A short introduction to the musician — sample text, to be replaced with the final version.",
    aboutMilestones: "Milestones",
    aboutPublications: "Publications",
    musicTitle: "Compositions & Recordings",
    musicLead: "Works by discipline, with links to recordings and scores — sample text.",
    musicOrgan: "Organ works",
    musicOrchestra: "Orchestral & chamber",
    musicPiano: "Piano music",
    musicTranscriptions: "Transcriptions & improvisations",
    musicRecordings: "Recordings",
    sectionDescription: "Section description — sample text.",
    poetryTitle: "Poetry",
    poetryLead: "Poems in four languages — sample text, to be replaced with the final versions.",
    galleryTitle: "Photography",
    galleryLead: "Photo captions — sample text, to be replaced.",
    contactsTitle: "Contact",
    contactsLead: "Contact directions below. Texts and addresses will be replaced with the final ones.",
    contactsBooking: "Concerts & booking",
    contactsPress: "Press",
    contactsScores: "Scores & publishing",
    contactsManagement: "Management",
    contactsManagementText: "Text about management and booking terms — sample, to be replaced.",
    blockNote: "Description — sample text.",
    footerBooking: "Concerts and booking — sample text",
    scorePdf: "Score (PDF)",
    fullScore: "Full score",
    poemSampleTitle: "Poem title — sample",
    poemSampleText: "Poem text — sample, to be replaced with the final version.",
  },
  es: {
    navHome: "Inicio",
    navAbout: "Biografía",
    navBio: "Bio",
    navPublications: "Publicaciones",
    navMusic: "Música",
    navOrgan: "Órgano",
    navOrchestra: "Orquesta",
    navPiano: "Piano",
    navTranscriptions: "Transcripciones",
    navRecordings: "Grabaciones",
    navPoetry: "Poesía",
    navConcerts: "Conciertos",
    navGallery: "Galería",
    navContact: "Contacto",
    langRussian: "Ruso",
    langEnglish: "Inglés",
    langSpanish: "Español",
    langPortuguese: "Portugués",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNav: "Navegación principal",
    homeUpcoming: "Próximos conciertos",
    homeAllConcerts: "Calendario completo y archivo",
    programNote: "Programa — texto de ejemplo.",
    concertsTitle: "Conciertos",
    concertsLead: "Catálogo de próximas actuaciones y archivo de veladas pasadas — texto de ejemplo.",
    concertsPast: "Actuaciones pasadas",
    aboutTitle: "Biografía",
    aboutLead: "Breve introducción al músico — texto de ejemplo, será reemplazado por la versión final.",
    aboutMilestones: "Etapas del camino",
    aboutPublications: "Publicaciones",
    musicTitle: "Composiciones y grabaciones",
    musicLead: "Obras por disciplina, con enlaces a grabaciones y partituras — texto de ejemplo.",
    musicOrgan: "Obras para órgano",
    musicOrchestra: "Orquestal y de cámara",
    musicPiano: "Música para piano",
    musicTranscriptions: "Transcripciones e improvisaciones",
    musicRecordings: "Grabaciones",
    sectionDescription: "Descripción de la sección — texto de ejemplo.",
    poetryTitle: "Poesía",
    poetryLead: "Poemas en cuatro idiomas — texto de ejemplo, será reemplazado por las versiones finales.",
    galleryTitle: "Fotografía",
    galleryLead: "Pies de foto — texto de ejemplo, será reemplazado.",
    contactsTitle: "Contacto",
    contactsLead: "A continuación, las vías de contacto. Los textos y direcciones serán reemplazados por los definitivos.",
    contactsBooking: "Conciertos y contratación",
    contactsPress: "Prensa",
    contactsScores: "Partituras y ediciones",
    contactsManagement: "Management",
    contactsManagementText: "Texto sobre management y condiciones de contratación — ejemplo, será reemplazado.",
    blockNote: "Descripción — texto de ejemplo.",
    footerBooking: "Conciertos y contratación — texto de ejemplo",
    scorePdf: "Partitura (PDF)",
    fullScore: "Partitura completa",
    poemSampleTitle: "Título del poema — ejemplo",
    poemSampleText: "Texto del poema — ejemplo, será reemplazado por la versión final.",
  },
  pt: {
    navHome: "Início",
    navAbout: "Sobre",
    navBio: "Bio",
    navPublications: "Publicações",
    navMusic: "Música",
    navOrgan: "Órgão",
    navOrchestra: "Orquestra",
    navPiano: "Piano",
    navTranscriptions: "Transcrições",
    navRecordings: "Gravações",
    navPoetry: "Poesia",
    navConcerts: "Concertos",
    navGallery: "Galeria",
    navContact: "Contato",
    langRussian: "Russo",
    langEnglish: "Inglês",
    langSpanish: "Espanhol",
    langPortuguese: "Português",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mainNav: "Navegação principal",
    homeUpcoming: "Próximos concertos",
    homeAllConcerts: "Calendário completo e arquivo",
    programNote: "Programa — texto de exemplo.",
    concertsTitle: "Concertos",
    concertsLead: "Catálogo das próximas atuações e arquivo de noites passadas — texto de exemplo.",
    concertsPast: "Atuações passadas",
    aboutTitle: "Biografia",
    aboutLead: "Breve introdução ao músico — texto de exemplo, será substituído pela versão final.",
    aboutMilestones: "Etapas do caminho",
    aboutPublications: "Publicações",
    musicTitle: "Composições e gravações",
    musicLead: "Obras por disciplina, com links para gravações e partituras — texto de exemplo.",
    musicOrgan: "Obras para órgão",
    musicOrchestra: "Orquestral e de câmara",
    musicPiano: "Música para piano",
    musicTranscriptions: "Transcrições e improvisações",
    musicRecordings: "Gravações",
    sectionDescription: "Descrição da seção — texto de exemplo.",
    poetryTitle: "Poesia",
    poetryLead: "Poemas em quatro idiomas — texto de exemplo, será substituído pelas versões finais.",
    galleryTitle: "Fotografia",
    galleryLead: "Legendas das fotos — texto de exemplo, será substituído.",
    contactsTitle: "Contato",
    contactsLead: "Abaixo, os canais de contato. Textos e endereços serão substituídos pelos finais.",
    contactsBooking: "Concertos e contratação",
    contactsPress: "Imprensa",
    contactsScores: "Partituras e edições",
    contactsManagement: "Management",
    contactsManagementText: "Texto sobre management e condições de contratação — exemplo, será substituído.",
    blockNote: "Descrição — texto de exemplo.",
    footerBooking: "Concertos e contratação — texto de exemplo",
    scorePdf: "Partitura (PDF)",
    fullScore: "Partitura completa",
    poemSampleTitle: "Título do poema — exemplo",
    poemSampleText: "Texto do poema — exemplo, será substituído pela versão final.",
  },
} as const;

export type DictKey = keyof (typeof dict)["en"];

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: (key: DictKey) => string };

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => dict.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("mg-lang");
    if (stored === "en" || stored === "es" || stored === "pt") setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("mg-lang", next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: DictKey) => dict[lang][key];

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  return useContext(LangContext);
}
