import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '../../../../data/products';
import styles from './product.module.css';

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, id } = await params;
  const product = products.find((p) => p.id === id && p.category === category);
  if (!product) return { title: 'Création Introuvable' };
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} | Dar El Sanna`,
      description: product.description.slice(0, 155),
      images: [{ url: product.image, width: 800, height: 1000, alt: product.name }],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  
  const product = products.find((p) => p.id === id && p.category === category);

  if (!product) {
    return (
      <div className={styles.notFoundContainer}>
        <div className="container">
          <h1 className={styles.notFoundTitle}>Création Introuvable</h1>
          <p className={styles.notFoundText}>
            L'œuvre recherchée n'est plus disponible ou a été acquise par un autre collectionneur.
          </p>
          <Link href="/collections" className={styles.backBtn}>
            Retourner au Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000';
  const message = `Bonjour Dar El Sanna, je souhaite acquérir la création d'exception "${product.name}" (${product.brand}) au prix de ${product.price.toLocaleString('fr-MA')} MAD.`;

  return (
    <div className={styles.detailsPage}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.separator}>/</span>
          <Link href="/collections">Catalogue</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/collections?category=${product.category}`} className={styles.active}>
            {product.category === 'antiquites' ? 'Antiquités Rares' : product.category.toUpperCase()}
          </Link>
        </nav>

        {/* Main Product Section */}
        <div className={styles.grid}>
          {/* Left Column: Image Gallery */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                priority
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className={product.category === 'parfumerie' ? styles.productImagePerfume : styles.productImage} 
              />
            </div>
            <p className={styles.imageCaption}>
              Photographie contractuelle de l'œuvre d'art — {product.material}
            </p>
          </div>

          {/* Right Column: Copywriting & Specifications */}
          <div className={styles.infoColumn}>
            <span className={styles.originLabel}>
              {product.brand} • {product.artisanOrigin || "Atelier Dar El Sanna"}
            </span>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price.toLocaleString('fr-MA')} MAD</p>

            <div className={styles.descriptionBlock}>
              <h3 className={styles.blockTitle}>L'Histoire de la Création</h3>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>

            {/* CTAs (Interactions exclusives via WhatsApp) */}
            <div className={styles.actionBlock}>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                Acquérir cette création via WhatsApp
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Bonjour Dar El Sanna, je souhaite contacter votre Conciergerie Royale pour demander une personnalisation ou obtenir des détails sur la création "${product.name}" (${product.brand}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryCta}
              >
                Demander une personnalisation (WhatsApp)
              </a>
            </div>

            {/* Dynamic Specifications Area */}
            <div className={styles.specificationsGrid}>
              
              {/* Specs Horlogerie */}
              {product.specs?.movement && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Mouvement</span>
                  <span className={styles.specValue}>{product.specs.movement}</span>
                </div>
              )}
              {product.specs?.glass && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Verre</span>
                  <span className={styles.specValue}>{product.specs.glass}</span>
                </div>
              )}
              
              {/* Specs Parfumerie */}
              {product.specs?.volume && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Volume</span>
                  <span className={styles.specValue}>{product.specs.volume}</span>
                </div>
              )}
              {product.specs?.topNotes && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Notes de Tête</span>
                  <span className={styles.specValue}>{product.specs.topNotes.join(' • ')}</span>
                </div>
              )}
              
              {/* Specs Bijouterie */}
              {product.specs?.metalType && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Métal Précieux</span>
                  <span className={styles.specValue}>{product.specs.metalType}</span>
                </div>
              )}
              {product.specs?.hallmark && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Poinçon</span>
                  <span className={styles.specValue}>{product.specs.hallmark}</span>
                </div>
              )}

            </div>

            <div className={styles.shippingInfo}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              <span>Livraison sécurisée et assurée incluse, au Maroc et à l'international. Un certificat d'authenticité accompagne chaque pièce.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
        <div className="container" style={{ marginTop: '5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary-text)' }}>
            Vous aimerez aussi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(similar => (
              <Link href={`/collections/${similar.category}/${similar.id}`} key={similar.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', marginBottom: '1rem', overflow: 'hidden' }}>
                  <Image src={similar.image} alt={similar.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{similar.brand}</p>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-playfair)', marginBottom: '0.5rem' }}>{similar.name}</h3>
                <p style={{ fontWeight: 600 }}>{similar.price.toLocaleString('fr-MA')} MAD</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD Product & BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "offers": {
              "@type": "Offer",
              "url": `https://www.darelsanna.ma/collections/${product.category}/${product.id}`,
              "priceCurrency": "MAD",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Dar El Sanna"
              }
            },
            "category": product.category,
            "material": product.material,
            "manufacturer": {
              "@type": "Organization",
              "name": product.artisanOrigin || "Dar El Sanna"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://www.darelsanna.ma/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Catalogue",
                "item": "https://www.darelsanna.ma/collections"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.category === 'antiquites' ? 'Antiquités Rares' : product.category.charAt(0).toUpperCase() + product.category.slice(1),
                "item": `https://www.darelsanna.ma/collections?category=${product.category}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": product.name,
                "item": `https://www.darelsanna.ma/collections/${product.category}/${product.id}`
              }
            ]
          })
        }}
      />
    </div>
  );
}
