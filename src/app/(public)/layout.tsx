import Header from "@/shared/ui/header/Header";
import {Footer} from "@/shared/ui/footer/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  console.log(process.env['DATABASE_URL'])

  return (
    <>
      <Header />

      <main className="main">{children}</main>

      <Footer />
    </>
  );
}