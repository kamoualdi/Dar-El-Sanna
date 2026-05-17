import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue — Bijouterie, Horlogerie, Parfumerie & Antiquités',
  description:
    'Explorez le catalogue Dar El Sanna : Haute Bijouterie en argent 925 de Tiznit, Parfums de niche tendance 2026 au Maroc, Haute Horlogerie et Antiquités Rares authentifiées. Acquisition via WhatsApp Conciergerie.',
  openGraph: {
    title: 'Catalogue Dar El Sanna — Luxe Artisanal Marocain',
    description: 'Bijouterie, Horlogerie, Parfumerie de niche et Antiquités Rares. Chaque pièce est unique.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Catalogue Dar El Sanna',
      },
    ],
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
