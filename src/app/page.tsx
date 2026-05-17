import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/images/hero.png" 
          alt="Cour intérieure d'un Riad marocain luxueux avec bassin et zelliges" 
          fill
          priority
          style={{ objectFit: 'cover' }}
          className={styles.heroBackground} 
        />
        <div className={styles.heroContent}>
          <p className={`${styles.heroSubtitle} fade-in`}>Dar El Sanna</p>
          <h1 className={`${styles.heroTitle} fade-in delay-100`}>
            L'héritage des Maâlems, réinventé pour le luxe contemporain.
          </h1>
          <Link href="/collections" className={`${styles.ctaButton} fade-in delay-300`}>
            Découvrir les Créations
          </Link>
        </div>
      </section>

      {/* Le Manifeste */}
      <section className={styles.manifesto}>
        <div className="container">
          <p className={styles.manifestoText}>
            Chaque pièce de notre collection est unique, chargée d'histoire et façonnée à la main par les plus grands <span className={styles.manifestoHighlight}>Maâlems</span> du Maroc. Nous perpétuons un savoir-faire ancestral dans le respect absolu de l'artisan et de la matière.
          </p>
        </div>
      </section>

      {/* Collections Phares */}
      <section className={styles.collections}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Les Univers</h2>
          <div className={styles.grid}>
            {/* Bijouterie */}
            <Link href="/collections?category=bijouterie" className={`${styles.gridItem} ${styles.item1}`}>
              <Image 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200" 
                alt="Haute Bijouterie Artisanale en argent ciselé" 
                fill
                style={{ objectFit: 'cover' }}
                className={styles.itemImage} 
              />
              <div className={styles.itemOverlay}>
                <h3 className={styles.itemTitle}>Haute Bijouterie</h3>
                <span className={styles.itemLink}>
                  Explorer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </Link>

            {/* Horlogerie */}
            <Link href="/collections?category=horlogerie" className={`${styles.gridItem} ${styles.item2}`}>
              <Image 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000" 
                alt="Garde-temps d'inspiration de Haute Horlogerie" 
                fill
                style={{ objectFit: 'cover' }}
                className={styles.itemImage} 
              />
              <div className={styles.itemOverlay}>
                <h3 className={styles.itemTitle}>Haute Horlogerie</h3>
                <span className={styles.itemLink}>
                  Explorer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </Link>

            {/* Parfumerie */}
            <Link href="/collections?category=parfumerie" className={`${styles.gridItem} ${styles.item3}`}>
              <Image 
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1200" 
                alt="Flacons et essences exclusives de Haute Parfumerie" 
                fill
                style={{ objectFit: 'cover' }}
                className={styles.itemImage} 
              />
              <div className={styles.itemOverlay}>
                <h3 className={styles.itemTitle}>Haute Parfumerie</h3>
                <span className={styles.itemLink}>
                  Explorer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </Link>

            {/* Antiquités Rares */}
            <Link href="/collections?category=antiquites" className={`${styles.gridItem} ${styles.item4}`}>
              <Image 
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1200" 
                alt="Antiquités Rares et pièces de collection marocaines" 
                fill
                style={{ objectFit: 'cover' }}
                className={styles.itemImage} 
              />
              <div className={styles.itemOverlay}>
                <h3 className={styles.itemTitle}>Antiquités Rares</h3>
                <span className={styles.itemLink}>
                  Explorer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Storytelling / Artisan Focus */}
      <section className={styles.artisan}>
        <div className="container">
          <div className={styles.artisanGrid}>
            <div className={styles.artisanImageWrapper}>
              <Image 
                src="/images/tapis.png" 
                alt="Artisan marocain travaillant un tapis traditionnel dans son atelier" 
                fill
                style={{ objectFit: 'cover' }}
                className={styles.artisanImage} 
              />
            </div>
            <div>
              <span className={styles.artisanLabel}>L'Âme de Dar El Sanna</span>
              <h2 className={styles.artisanTitle}>Rencontre avec le Maâlem Abdelkader</h2>
              <p className={styles.artisanText}>
                Depuis plus de quarante ans, dans le secret de son atelier de la médina de Fès, Abdelkader cisèle le cuivre et donne vie à des pièces d'une finesse inouïe. Chaque geste est précis, hérité de son père et de son grand-père. "Le métal a une âme", nous dit-il, "il faut savoir l'écouter."
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna%2C%20je%20souhaite%20d%C3%A9couvrir%20l%27histoire%20de%20vos%20Ma%C3%A2lems%20artisans.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.outlineButton}
              >
                Découvrir son Histoire
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
