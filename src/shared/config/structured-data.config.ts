import { DEVELOPER_CONFIG } from "./developer.config";
import { PERSON_CONFIG } from "./person.config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: `${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`,

  jobTitle: PERSON_CONFIG.post,

  url: SITE_URL,

  sameAs: [PERSON_CONFIG.socials.telegram, PERSON_CONFIG.socials.vk].filter(
    Boolean
  ),

  email: PERSON_CONFIG.socials.email,

  telephone: PERSON_CONFIG.socials.phone,

  knowsAbout: [
    "Командный коучинг",
    "Лидерство",
    "Развитие команд",
    "Фасилитация",
    "Стратегические сессии",
    "Организационное развитие",
    "Эмоциональный интеллект",
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",

  name: `${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`,

  url: SITE_URL,

  image: `${SITE_URL}/images/og/cover.webp`,

  email: PERSON_CONFIG.socials.email,

  telephone: PERSON_CONFIG.socials.phone,

  founder: {
    "@type": "Person",
    name: `${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`,
  },
};

export const developerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: DEVELOPER_CONFIG.name,

  jobTitle: "Frontend Developer",

  url: DEVELOPER_CONFIG.url,

  sameAs: [DEVELOPER_CONFIG.telegram].filter(Boolean),
};
