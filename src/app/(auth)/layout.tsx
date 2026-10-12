import { ClerkProvider } from "@clerk/nextjs";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
