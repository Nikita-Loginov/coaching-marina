import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProgramById,
  getPrograms,
} from "@/entities/program/model/program.queries";
import { Program } from "@/screens/program";
import { stripHtml } from "@/shared/utils/stripHtml.util";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const program = await getProgramById(id);

  if (!program) {
    notFound();
  }

  return {
    title: program.name,
    description: stripHtml(program.description[0]),

    alternates: {
      canonical: `/programs/${id}`,
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

export async function generateStaticParams(): Promise<Params[]> {
  const programs = await getPrograms();

  return programs.map((program) => ({
    id: program.id,
  }));
}

export default async function ProgramPage({ params }: PageProps) {
  const { id } = await params;

  return <Program id={id} />;
}
