import Header from "@/shared/ui/header/Header";
import {Footer} from "@/shared/ui/footer/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <>
      <Header />

      <main className="main">{children}</main>

      <Footer />
    </>
  );
}