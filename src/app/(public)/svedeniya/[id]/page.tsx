import { Svedeniya } from "@/pages/svedeniya";


type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function SvedeniyaPage({params} : PageProps) {
  const { id } = await params;

  return <Svedeniya id={id}/>;
}
