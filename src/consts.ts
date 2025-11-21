export interface CardTheme {
  textColor: string;
  backgroundClass: string;
  accentColor: string;
  borderColor: string;
  subtleColor: string;
  decorativeLineColor: string;
  numberColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  gradient?: string;
  titleColor: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleFontFamily?: string;
  descriptionColor: string;
  descriptionFontSize: string;
  descriptionFontFamily?: string;
  sectionTitleColor: string;
  sectionTitleFontSize: string;
  sectionTitleFontWeight: string;
  sectionTitleFontFamily?: string;
  keyPointColor: string;
  keyPointFontSize: string;
  keyPointFontFamily?: string;
  numberBackgroundColor: string;
  numberTextColor: string;
  numberFontWeight: string;
  numberFontFamily?: string;
  decorativeLineWidth: string;
  decorativeLineHeight: string;
  fontFamily?: string;
  linkColor: string;
}

export interface SlideTheme {
  background: string;
  type: "solid" | "gradient";
  titleFont: string;
  titleWeight: number | "normal" | "bold";
  titleTransform: "uppercase" | "none" | "capitalize" | "lowercase";
  textFont: string;
  titleColor: string;
  textColor: string;
  overlayColor: string;
}

export const SITE_TITLE = "ANKL cap";
export const SITE_DESCRIPTION = "ANKL cap — Komplexné riešenia pre rast vašej značky";

export const PROD_URL = "https://www.anklcap.sk";

export const isProdEnv = () => {
  if (import.meta.env?.PROD || import.meta.env?.MODE === "production") {
    return true;
  }

  if (typeof window !== "undefined") {
    return window.location.origin === PROD_URL;
  }

  return false;
};

export const isProd = isProdEnv();

export const ASSETS_IMAGES_PREFIX = "/src/assets/images";

export const MERMAID_LIVE_BASE_URL = "https://mermaid.live";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  showWhenLoggedOut?: boolean;
  showWhenLoggedIn?: boolean;
  title?: string;
  description?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "blogs",
    label: "Noviny",
    href: "/blogs",
    title: "Noviny",
    description:
      "Noviny ANKL cap",
  },
    {
    id: "o nas",
    label: "O nas",
    href: "/o-nas",
    title: "O nas",
    description:
      "Informácie o ANKL cap",
  },
      {
    id: "kontakt",
    label: "Kontakty",
    href: "/kontakty",
    title: "Kontakty",
    description: "Kontaktné informácie",
  },
];

export const getNavigationItems = (): MenuItem[] => {
  return MENU_ITEMS;
};

export const DOODLE_EMOJIS = [
  "✨",
  "🚀",
  "💡",
  "🎉",
  "🔥",
  "🌟",
  "🤖",
  "🎃",
  "🔊",
  "📡",
];
