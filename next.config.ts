import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Браузер открывает www, а сервер за прокси видит origin.
      // Без этого «Выйти» и вход получают 500 на POST текущей страницы.
      allowedOrigins: ["www.marinayagunova.ru", "marinayagunova.ru"],
    },
  },
  sassOptions: {
    additionalData: `
      @use "@/app/styles/base/breakpoints" as *;
      @use "@/app/styles/base/helpers" as *;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
