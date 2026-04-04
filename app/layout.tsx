import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Адеми Тергенбаева — Врач-дерматолог | Demi Results",
  description: "Кожа — это не косметика. Это наука. Врач-дерматолог, основатель Demi Results, Бишкек",
  openGraph: {
    title: "Адеми Тергенбаева — Demi Results",
    description: "Кожа — это не косметика. Это наука.",
    images: ["/ademi-avatar.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-milk text-text-main font-body">
        {children}
      </body>
    </html>
  );
}
