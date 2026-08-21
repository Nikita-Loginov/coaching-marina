import type { StaticImageData } from "next/image";

export type PersonAbout = {
  desc: string[];
  title: string;
  experience: string;
  images: string[];
};

export type PersonContacts = {
  email: string;
  phone: string;
  website: string;
  address: {
    label: string;
    link: string;
  };
};

export type PersonSocials = {
  telegram: string;
  vk: string;
};

export type PersonPractice = {
  label: string;
  experience: string;
  clients: string;
  countAreas: number;
};

export type PersonInfoItem = {
  title: string;
  description: string;
};

export type PersonNestedItem = {
  title: string;
  items: PersonInfoItem[];
};

export type PersonInfoSection = {
  title: string;
  items: (PersonInfoItem | PersonNestedItem)[];
};

export type PersonItem = {
  id: string;

  name: string;
  middlename: string;
  fullname: string;
  post: string;
  clients: string;
  countAreas: number;

  about: PersonAbout;
  contacts: PersonContacts;
  socials: PersonSocials;
  practice: PersonPractice;
  license: string;

  organization: PersonInfoSection;
  management: PersonInfoSection;
  education: PersonInfoSection;
  materialTechnicalSupport: PersonInfoSection;
  paidEducationalServices: PersonInfoSection;
  financialActivity: PersonInfoSection;
  vacantPlaces: PersonInfoSection;
  studentSupport: PersonInfoSection;
  internationalCooperation: PersonInfoSection;

  documents: PersonDocument[];
};

export type PersonDocument = {
  id: string;
  name: string;
  description: string[];
  file: string;
};

export type PersonRow = {
  id: string;

  name: string;
  middlename: string;
  fullname: string;
  post: string;
  clients: string;
  countAreas: number;
  license: string;

  about: unknown;
  contacts: unknown;
  socials: unknown;
  practice: unknown;

  organization: unknown;
  management: unknown;
  education: unknown;
  materialTechnicalSupport: unknown;
  paidEducationalServices: unknown;

  financialActivity: unknown;
  vacantPlaces: unknown;
  studentSupport: unknown;
  internationalCooperation: unknown;

  documents: unknown;
};