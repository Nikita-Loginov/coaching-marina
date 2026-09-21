import { Inter } from "next/font/google";
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
    <html lang="ru" className={`${interSans.variable}`}>
      <head>
        <meta name="yandex-verification" content="33c9889b15fcd99c" />

        <Script
          id="yandex-metrika"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                  (m[i].a=m[i].a||[]).push(arguments)
                };
                m[i].l=1*new Date();

                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) {
                    return;
                  }
                }

                k=e.createElement(t),
                a=e.getElementsByTagName(t)[0],
                k.async=1,
                k.src=r,
                a.parentNode.insertBefore(k,a)
              })(
                window,
                document,
                'script',
                'https://mc.yandex.ru/metrika/tag.js?id=112788218',
                'ym'
              );

              ym(112788218, 'init', {
                ssr: true,
                webvisor: true,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
              });
            `,
          }}
        />
      </head>

      <body className="body">
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/112788218"
              style={{
                position: "absolute",
                left: "-9999px",
              }}
              alt=""
            />
          </div>
        </noscript>

        <ClerkProvider>
          <ModalProvider>
            <div className="wrapper">{children}</div>

            <FixedBlock />

            <Toaster position="top-right" />

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
