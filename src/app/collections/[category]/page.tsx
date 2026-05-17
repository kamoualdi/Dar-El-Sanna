import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../../data/products';
import styles from './category.module.css';

import categoriesData from '../../../data/categories.json';

const categoryLabels: Record<string, string> = {};
const categoryDescriptions: Record<string, string> = {};

categoriesData.categories.forEach(cat => {
  categoryLabels[cat.id] = cat.label;
  categoryDescriptions[cat.id] = cat.description;
});

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: 'bijouterie' },
    { category: 'horlogerie' },
    { category: 'parfumerie' },
    { category: 'antiquites' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  const categoryProducts = products.filter(p => p.category === category);

  return {
    title: `${label} — Dar El Sanna`,
    description: categoryDescriptions[category] || `Découvrez notre collection de ${label}.`,
    openGraph: {
      title: `${label} | Dar El Sanna`,
      description: categoryDescriptions[category],
      images: categoryProducts.length > 0 ? [
        { url: categoryProducts[0].image, width: 1200, height: 630, alt: label }
      ] : [],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryProducts = products.filter(p => p.category === category);
  const label = categoryLabels[category] || category;

  if (categoryProducts.length === 0) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h1>Aucune création dans cette catégorie</h1>
        <Link href="/collections">Retourner au Catalogue</Link>
      </div>
    );
  }

  return (
    <div className={styles.categoryPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Dar El Sanna</span>
          <h1 className={styles.title}>{label}</h1>
          <p className={styles.description}>
            {categoryDescriptions[category]}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <div className="container">
        <p className={styles.productCount}>
          {categoryProducts.length} {categoryProducts.length > 1 ? 'créations' : 'création'}
        </p>
        <div className={styles.productGrid}>
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${product.category}/${product.id}`}
              className={styles.card}
            >
              <div className={styles.cardImageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.cardImage}
                />
                {product.badge && (
                  <span className={styles.cardBadge}>{product.badge}</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardBrand}>{product.brand}</span>
                <h2 className={styles.cardTitle}>{product.name}</h2>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{product.price.toLocaleString('fr-FR')} DH</span>
                  <span className={styles.exploreLink}>Découvrir</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
