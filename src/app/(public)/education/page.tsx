import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProgramById } from "@/entities/program/model/program.queries";
import { Education } from "@/screens/education";
import { stripHtml } from "@/shared/utils/stripHtml.util";

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgramById("training-programs");

  if (!program) {
    notFound();
  }

  return {
    title: program.name,
    description: program.description[0],

    alternates: {
      canonical: "/education",
    },

    openGraph: {
      title: program.name,
      description: stripHtml(program.description[0]),
    },

    twitter: {
      card: "summary_large_image",
      title: program.name,
      description: stripHtml(program.description[0]),
    },
  };
}

export default async function EducationPage() {
  return <Education />;
}
