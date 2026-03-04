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

export const metadata = {
  title: "Ioan Gi-Kwong | Développeur Web",
  description:
    "Ioan Gi-Kwong — Développeur web freelance. Sites web modernes et performants pour PME.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
