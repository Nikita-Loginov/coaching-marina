// import type { ProgramItem } from "@/entities/program/model/program.types";

import { DEVELOPER_CONFIG } from "./developer.config";
import { PERSON_CONFIG } from "./person.config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: `${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename} — ${PERSON_CONFIG.post}`,

  url: SITE_URL,

  inLanguage: "ru-RU",

  hasPart: [
    {
      "@type": "WebPage",
      name: "Главная",
      url: `${SITE_URL}/`,
    },
    {
      "@type": "WebPage",
      name: "Сведения об образовательной организации",
      url: `${SITE_URL}/svedeniya-ob-obrazovatelnoj-organizacii`,
    },
  ],
};

// export const createProgramSchema = (program: ProgramItem) => ({
//   "@context": "https://schema.org",
//   "@type": "CreativeWork",

//   name: program.name,

//   headline: program.seo.title,

//   description: program.seo.description,

//   image: `${process.env.NEXT_PUBLIC_SITE_URL}/${program.seo.image}`,

//   author: {
//     "@type": "Person",
//     name: DEVELOPER_CONFIG.name,
//     url: DEVELOPER_CONFIG.url,
//   },

//   creator: {
//     "@type": "Person",
//     name: DEVELOPER_CONFIG.name,
//   },

//   url: `${process.env.NEXT_PUBLIC_SITE_URL}/program/${program.id}`,

//   // dateModified: project.updatedAt,
// });
