import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPerson } from "@/entities/person/model/person.queries";
import { Svedeniya } from "@/screens/svedeniya";

export async function generateMetadata(): Promise<Metadata> {
  const person = await getPerson();

  if (!person) {
    notFound();
  }

  return {
    title: `Сведения об образовательной организации | ${person.fullname}`,
    description: `Сведения об образовательной организации ${person.fullname}. Информация об образовании, лицензии, документах, материально-техническом обеспечении и платных образовательных услугах.`,

    alternates: {
      canonical: "/legal",
    },

    openGraph: {
      title: `Сведения об образовательной организации | ${person.fullname}`,
      description: `Сведения об образовательной организации ${person.fullname}.`,
    },

    twitter: {
      card: "summary_large_image",
      title: `Сведения об образовательной организации | ${person.fullname}`,
      description: `Сведения об образовательной организации ${person.fullname}.`,
    },
  };
}

export default function SvedeniyaPage() {
  return <Svedeniya id="obrazovatelnoj-organizacii" />;
}
