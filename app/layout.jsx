import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://ioangikwong.dev";

export const metadata = {
  title: "Ioan Gi-Kwong | Développeur Web",
  description:
    "Développeur web freelance basé à Cowansville, QC. Sites web sur mesure, rapides et optimisés pour les PME du Québec.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ioan Gi-Kwong | Développeur Web",
    description:
      "Sites web sur mesure, rapides et optimisés pour les PME du Québec.",
    url: siteUrl,
    siteName: "Ioan Gi-Kwong",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ioan Gi-Kwong | Développeur Web",
    description:
      "Sites web sur mesure, rapides et optimisés pour les PME du Québec.",
  },
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ioan Gi-Kwong — Développeur Web",
  url: siteUrl,
  description:
    "Développeur web freelance basé à Cowansville. Sites web sur mesure, rapides et optimisés pour les PME du Québec.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cowansville",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  email: "ioan@ioangikwong.dev",
  priceRange: "$$",
  areaServed: {
    "@type": "Place",
    name: "Estrie, Québec",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${plusJakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
