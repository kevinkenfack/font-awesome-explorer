import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Font Awesome Explorer",
  description: "Explorez et trouvez les icônes Font Awesome parfaites pour votre projet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/icons/css/all.min.css" />
        <style>
          {`
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-solid-900.woff2') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-regular-400.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-light-300.woff2') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-thin-100.woff2') format('woff2');
              font-weight: 100;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-duotone-900.woff2') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-duotone-light-300.woff2') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-duotone-regular-400.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-duotone-thin-100.woff2') format('woff2');
              font-weight: 100;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-duotone-light-300.woff2') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-duotone-regular-400.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-duotone-solid-900.woff2') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-duotone-thin-100.woff2') format('woff2');
              font-weight: 100;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-light-300.woff2') format('woff2');
              font-weight: 300;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-regular-400.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-solid-900.woff2') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Pro';
              src: url('/icons/webfonts/fa-sharp-thin-100.woff2') format('woff2');
              font-weight: 100;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'Font Awesome 6 Brands';
              src: url('/icons/webfonts/fa-brands-400.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
