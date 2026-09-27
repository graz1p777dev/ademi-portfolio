import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://portfolio.ademi.kg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Врач-дерматолог в Бишкеке — Адеми Тергенбаева | Demi Results",
  description: "Адеми Тергенбаева — врач-дерматолог в Бишкеке. Диагностика и лечение акне, розацеа, дерматитов, псориаза и других заболеваний кожи.",
  keywords: [
    "врач-дерматолог Бишкек",
    "дерматолог Бишкек",
    "дерматология Бишкек",
    "лечение акне",
    "розацеа",
    "дерматиты",
    "псориаз",
    "дерматовенерология",
    "уход за кожей",
  ],
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  authors: [{ name: "Адеми Тергенбаева" }],
  creator: "Адеми Тергенбаева",
  icons: {
    icon: '/data/photo/ademi-avatar.png?v=2',
    shortcut: '/data/photo/ademi-avatar.png?v=2',
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    title: "Врач-дерматолог в Бишкеке — Адеми Тергенбаева",
    description: "Диагностика и лечение заболеваний кожи, акне, розацеа и дерматитов. Бишкек, Кыргызстан.",
    siteName: "Адеми Тергенбаева | Demi Results",
    images: [{
      url: "/data/photo/ademi-avatar.png",
      alt: "Адеми Тергенбаева — врач-дерматолог",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Врач-дерматолог в Бишкеке — Адеми Тергенбаева",
    description: "Диагностика и лечение заболеваний кожи, акне, розацеа и дерматитов.",
    images: ["/data/photo/ademi-avatar.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Адеми Тергенбаева | Demi Results",
      description: "Портфолио врача-дерматолога Адеми Тергенбаевой в Бишкеке.",
      inLanguage: ["ru", "ky", "en"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Адеми Тергенбаева Жомартовна",
      url: siteUrl,
      image: `${siteUrl}/data/photo/ademi-avatar.png`,
      jobTitle: "Врач-дерматолог",
      description: "Врач-дерматолог, skin-эксперт и сооснователь Demi Results в Бишкеке.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Бишкек",
        addressCountry: "KG",
      },
      worksFor: { "@type": "Organization", name: "Demi Results" },
      sameAs: [
        "https://instagram.com/doctor_ademi",
        "https://t.me/ademi_doctor",
      ],
      knowsAbout: [
        "дерматология",
        "акне",
        "розацеа",
        "дерматиты",
        "псориаз",
        "уход за кожей",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="icon" href="/data/photo/ademi-avatar.png?v=2" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-milk text-text-main font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
