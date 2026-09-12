import { createContext, useContext, type ReactNode } from "react";

import logoAsset from "@/assets/logo-ganelin.webp.asset.json";
import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";
import mosheHeroAsset from "@/assets/moshe-hero.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import organWideAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";
import venueCathedralAsset from "@/assets/venue-cathedral.webp.asset.json";
import venueHallAsset from "@/assets/venue-hall.webp.asset.json";
import venuePetrikircheAsset from "@/assets/venue-petrikirche.webp.asset.json";

/** Все изображения сайта, которые можно заменить в панели управления. */
export const imageRegistry = [
  {
    key: "logo",
    group: "Общее",
    label: "Логотип",
    hint: "Показывается в меню, в подвале и на главной странице. Лучше PNG или WebP с прозрачным фоном.",
    defaultUrl: logoAsset.url,
  },
  {
    key: "menuBg",
    group: "Общее",
    label: "Фон открытого меню",
    hint: "Большая фотография на фоне открытого меню. Также используется в разделе Photography.",
    defaultUrl: menuBgAsset.url,
  },
  {
    key: "heroPoster",
    group: "Главная страница",
    label: "Кадр-заставка для видео на главной",
    hint: "Показывается, пока видео не загрузилось.",
    defaultUrl: heroPosterAsset.url,
  },
  {
    key: "mosheHero",
    group: "Фотографии музыканта",
    label: "Портрет",
    hint: "Портретное фото, используется в разделе Photography.",
    defaultUrl: mosheHeroAsset.url,
  },
  {
    key: "organWide",
    group: "Фотографии музыканта",
    label: "За органом (широкое фото)",
    hint: "Верхнее фото на страницах Biography и Transcriptions, а также в Photography.",
    defaultUrl: organWideAsset.url,
  },
  {
    key: "console",
    group: "Фотографии музыканта",
    label: "За кафедрой органа",
    hint: "Фото внутри страницы Biography, верхнее фото в Improvisations, есть в Photography.",
    defaultUrl: consoleAsset.url,
  },
  {
    key: "piano",
    group: "Фотографии музыканта",
    label: "За роялем",
    hint: "Верхнее фото на страницах Ganelin's music и Ganelin's poetry, фон в Biography.",
    defaultUrl: pianoAsset.url,
  },
  {
    key: "stage",
    group: "Фотографии музыканта",
    label: "На сцене",
    hint: "Верхнее фото на страницах Concert schedule, Press и Concert videos.",
    defaultUrl: stageAsset.url,
  },
  {
    key: "architecture",
    group: "Фотографии музыканта",
    label: "Исторический орган",
    hint: "Фотография инструмента, используется в разделе Photography.",
    defaultUrl: architectureAsset.url,
  },
  {
    key: "venueHall",
    group: "Фотографии залов (карточки концертов)",
    label: "Концертный зал",
    hint: "Появляется на карточках концертов при наведении или прокрутке.",
    defaultUrl: venueHallAsset.url,
  },
  {
    key: "venueCathedral",
    group: "Фотографии залов (карточки концертов)",
    label: "Собор",
    hint: "Появляется на карточках концертов и вверху страницы отдельного концерта.",
    defaultUrl: venueCathedralAsset.url,
  },
  {
    key: "venuePetrikirche",
    group: "Фотографии залов (карточки концертов)",
    label: "Кирха",
    hint: "Появляется на карточках концертов при наведении или прокрутке.",
    defaultUrl: venuePetrikircheAsset.url,
  },
] as const;

export type ImageKey = (typeof imageRegistry)[number]["key"];

export type ImageOverrides = Partial<Record<string, string>>;

export const imageDefaults: Record<ImageKey, string> = imageRegistry.reduce(
  (acc, item) => {
    acc[item.key] = item.defaultUrl;
    return acc;
  },
  {} as Record<ImageKey, string>,
);

export const imageKeys: string[] = imageRegistry.map((item) => item.key);

const ImagesContext = createContext<ImageOverrides>({});

export function ImagesProvider({
  overrides,
  children,
}: {
  overrides?: ImageOverrides;
  children: ReactNode;
}) {
  return <ImagesContext.Provider value={overrides ?? {}}>{children}</ImagesContext.Provider>;
}

/** Адрес картинки: заменённая в панели или исходная. */
export function useSiteImage(key: ImageKey): string {
  const overrides = useContext(ImagesContext);
  const custom = overrides[key];
  return custom && custom.length > 0 ? custom : imageDefaults[key];
}

export function useSiteImages(): Record<ImageKey, string> {
  const overrides = useContext(ImagesContext);
  const out = { ...imageDefaults };
  for (const key of imageKeys) {
    const value = overrides[key];
    if (value) out[key as ImageKey] = value;
  }
  return out;
}
