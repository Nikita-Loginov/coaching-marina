import { Program } from "@/screens/program";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function ProgramPage({ params }: PageProps) {
  const { id } = await params;

  return <Program id={id} />;
}
