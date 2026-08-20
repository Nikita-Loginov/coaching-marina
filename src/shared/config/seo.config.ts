import { Metadata } from "next";

import { DEVELOPER_CONFIG } from "./developer.config";
import { PERSON_CONFIG } from "./person.config";

export const SITE_CONFIG = {
  name: `${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`,
  title: PERSON_CONFIG.post,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coaching-marina.vercel.app/",
  locale: "ru_RU",

  developer: {
    name: DEVELOPER_CONFIG.name,
    url: DEVELOPER_CONFIG.url,
    telegram: DEVELOPER_CONFIG.telegram,
  },
} as const;

const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

export const HOME_DESCRIPTION =
  "Марина Ягунова — командный коуч ICF. Помогаю руководителям, командам и компаниям выстраивать эффективное взаимодействие, развивать лидерство и достигать устойчивых результатов.";

export const KEYWORDS = [
  "Марина Ягунова",
  "командный коуч",
  "коуч ICF",
  "ICF коуч",
  "коучинг",
  "бизнес коуч",
  "коуч для руководителей",
  "командный коучинг",
  "развитие команд",
  "развитие лидерства",
  "лидерство",
  "управление изменениями",
  "стратегические сессии",
  "фасилитация",
  "корпоративное обучение",
  "обучение руководителей",
  "эмоциональный интеллект",
  "организационное развитие",
  "коучинг для бизнеса",
  "коуч Москва",
];

export const seoConfig: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: HOME_DESCRIPTION,

  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
      },
    ],

    other: [
      {
        rel: "manifest",
        url: "/images/favicon/site.webmanifest",
      },
    ],
  },

  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: HOME_DESCRIPTION,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: "/images/og/cover.webp",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: HOME_DESCRIPTION,
    images: ["/images/og/cover.webp"],
  },

  authors: [
    {
      name: PERSON_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    {
      name: SITE_CONFIG.developer.name,
      url: SITE_CONFIG.developer.url,
    },
  ],

  applicationName: SITE_CONFIG.name,

  keywords: KEYWORDS,

  category: "coaching",

  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },

  creator: SITE_CONFIG.developer.name,
  publisher: SITE_CONFIG.name,

  other: {
    developer: SITE_CONFIG.developer.name,
    "developer-url": SITE_CONFIG.developer.url,
    "developer-telegram": SITE_CONFIG.developer.telegram,
  },

  alternates: {
    canonical: "/",
  },

  referrer: "origin-when-cross-origin",

  // themeColor: "#EDF4FC",

  generator: "Next.js",
};

export function createPageMetadata(
  title: string,
  description?: string,
  canonical?: string
): Metadata {
  return {
    title,
    description: description ?? HOME_DESCRIPTION,
    alternates: {
      canonical,
    },
  };
}
