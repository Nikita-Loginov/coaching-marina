import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";

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
        <div className="wrapper">{children}</div>

        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}
