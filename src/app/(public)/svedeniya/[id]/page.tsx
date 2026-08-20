import { notFound } from "next/navigation";

import { Svedeniya } from "@/screens/svedeniya";
import { SVEDENIYA_CONFIG, SvedeniyaId } from "@/screens/svedeniya/lib/svedeniya.config";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function SvedeniyaPage({ params }: PageProps) {
  const { id } = await params;

  if (!(id in SVEDENIYA_CONFIG)) {
    notFound();
  }

  return <Svedeniya id={id as SvedeniyaId} />;
}
