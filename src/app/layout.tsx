import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

import { FixedBlock, ModalProvider } from "@/shared/ui/index.ui";

import { seoConfig } from "../shared/config/index.config";
import {
  personSchema,
  developerSchema,
  websiteSchema,
  organizationSchema,
} from "../shared/config/index.config";

import "@styles/global.scss";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const playfairDisplaySans = Playfair_Display({
  variable: "--font-playfair-display-sans",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = seoConfig;

const structuredData = [
  websiteSchema,
  organizationSchema,
  personSchema,
  developerSchema,
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ru"
      className={`${interSans.variable} ${playfairDisplaySans.variable}`}
    >
      <body className="body">
        <ClerkProvider>
          <ModalProvider>
            <div className="wrapper">{children}</div>

            <FixedBlock />

            <Toaster
              position="top-right"
            />

            <div id="modal-root"></div>
          </ModalProvider>

          <Script
            id="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
