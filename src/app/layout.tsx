import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dar El Sanna | L'héritage des Maâlems — Bijoux, Parfums & Antiquités Rares",
    template: "%s | Dar El Sanna",
  },
  description:
    "Galerie de luxe en ligne dédiée à l'artisanat marocain d'exception. Haute Bijouterie en argent 925, Haute Parfumerie de niche, Haute Horlogerie et Antiquités Rares. Acquisition exclusive via WhatsApp Conciergerie.",
  keywords: [
    "bijouterie maroc luxe",
    "parfum maroc 2026",
    "abderrazzak benchaâbane",
    "baccarat rouge maroc",
    "antiquités marocaines",
    "artisanat marocain",
    "dar el sanna",
    "maâlem",
    "argent tiznit",
    "oud maroc",
  ],
  authors: [{ name: "Dar El Sanna" }],
  creator: "Dar El Sanna",
  publisher: "Dar El Sanna",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://www.darelsanna.ma",
    siteName: "Dar El Sanna",
    title: "Dar El Sanna | Galerie de Luxe Artisanale Marocaine",
    description:
      "Haute Bijouterie, Parfumerie de Niche, Horlogerie et Antiquités Rares. L'héritage des Maâlems réinventé pour le luxe contemporain.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Dar El Sanna — Galerie de Luxe Artisanale Marocaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dar El Sanna | Galerie de Luxe Artisanale Marocaine",
    description:
      "Haute Bijouterie, Parfumerie de Niche, Horlogerie et Antiquités Rares.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  alternates: {
    canonical: "https://www.darelsanna.ma",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Script Plausible Analytics (Compteur de visiteurs respectueux de la vie privée, sans cookies) */}
        <script defer data-domain="darelsanna.ma" src="https://plausible.io/js/script.js"></script>
        
        {/* JSON-LD Organization (Données structurées SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dar El Sanna",
              "alternateName": "Moorish Elegance",
              "url": "https://www.darelsanna.ma",
              "logo": "https://www.darelsanna.ma/images/logo.png",
              "description": "Galerie de luxe en ligne dédiée à l'artisanat marocain d'exception. Haute Bijouterie, Haute Parfumerie, Haute Horlogerie et Antiquités Rares.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Marrakech",
                "addressCountry": "MA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Conciergerie",
                "availableLanguage": ["French", "Arabic", "English"]
              },
              "sameAs": []
            })
          }}
        />

        {/* JSON-LD WebSite (SearchAction pour barre de recherche Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Dar El Sanna",
              "url": "https://www.darelsanna.ma",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.darelsanna.ma/collections?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* JSON-LD LocalBusiness (SEO local Marrakech) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Dar El Sanna",
              "image": "https://www.darelsanna.ma/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Médina de Marrakech",
                "addressLocality": "Marrakech",
                "addressCountry": "MA"
              },
              "priceRange": "MAD",
              "telephone": `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}`,
              "url": "https://www.darelsanna.ma"
            })
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
