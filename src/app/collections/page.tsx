'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, Product } from '../../data/products';
import styles from './collections.module.css';

function CollectionsContent() {
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('parfumerie');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronisation avec les paramètres d'URL (ex: clics depuis le header)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('parfumerie');
    }
  }, [searchParams]);

  // Liste unique des matériaux disponibles pour le filtrage
  const materials = useMemo(() => {
    const allMaterials = products.map(p => p.material.split(' & ')[0].split(' / ')[0].split(' de ')[0]);
    return Array.from(new Set(allMaterials));
  }, []);

  // Filtrage intelligent en temps réel
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchGender = selectedGender === 'all' || 
        product.subcategory === selectedGender || 
        (product.category !== 'parfumerie' && selectedGender === 'all');

      const matchMaterial = selectedMaterial === 'all' || 
        product.material.toLowerCase().includes(selectedMaterial.toLowerCase()) ||
        (product.specs?.metalType === selectedMaterial);

      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchGender && matchMaterial && matchSearch;
    });
  }, [selectedCategory, selectedGender, selectedMaterial, searchQuery]);

  return (
    <div className={styles.shopContainer}>
      {/* Editorial Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Galerie Numérique d'Exception</span>
          <h1 className={styles.title}>Les Créations Dar El Sanna</h1>
          <p className={styles.description}>
            Chaque pièce est une œuvre d'art façonnée à la main, chargée d'histoire et de sillage. 
            Découvrez nos collections de Haute Bijouterie, Haute Horlogerie et Haute Parfumerie.
          </p>
        </div>
      </section>

      {/* Main Shop Interface */}
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Recherche</h3>
              <input 
                type="text" 
                placeholder="Rechercher une œuvre..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Départements</h3>
              <div className={styles.filterGroup}>
                <button 
                  className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  Tous les Univers
                </button>
                <button 
                  className={`${styles.filterBtn} ${selectedCategory === 'bijouterie' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('bijouterie')}
                >
                  Haute Joaillerie
                </button>
                <button 
                  className={`${styles.filterBtn} ${selectedCategory === 'horlogerie' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('horlogerie')}
                >
                  Haute Horlogerie
                </button>
                <button 
                  className={`${styles.filterBtn} ${selectedCategory === 'parfumerie' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('parfumerie')}
                >
                  Haute Parfumerie
                </button>
                <button 
                  className={`${styles.filterBtn} ${selectedCategory === 'antiquites' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('antiquites')}
                >
                  Antiquités Rares
                </button>
              </div>
            </div>

            {/* Filtre Genre spécifique à la Parfumerie */}
            {selectedCategory === 'parfumerie' && (
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Sillages</h3>
                <div className={styles.filterGroup}>
                  <button 
                    className={`${styles.filterBtn} ${selectedGender === 'all' ? styles.active : ''}`}
                    onClick={() => setSelectedGender('all')}
                  >
                    Tous
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${selectedGender === 'homme' ? styles.active : ''}`}
                    onClick={() => setSelectedGender('homme')}
                  >
                    Pour Homme
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${selectedGender === 'femme' ? styles.active : ''}`}
                    onClick={() => setSelectedGender('femme')}
                  >
                    Pour Femme
                  </button>
                  <button 
                    className={`${styles.filterBtn} ${selectedGender === 'unisex' ? styles.active : ''}`}
                    onClick={() => setSelectedGender('unisex')}
                  >
                    Unisex
                  </button>
                </div>
              </div>
            )}

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Matières Nobles</h3>
              <div className={styles.filterGroup}>
                <button 
                  className={`${styles.filterBtn} ${selectedMaterial === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedMaterial('all')}
                >
                  Toutes
                </button>
                {materials.map(mat => (
                  <button 
                    key={mat}
                    className={`${styles.filterBtn} ${selectedMaterial === mat ? styles.active : ''}`}
                    onClick={() => setSelectedMaterial(mat)}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className={styles.mainGridArea}>
            <div className={styles.gridHeader}>
              <p className={styles.productCount}>
                {filteredProducts.length} {filteredProducts.length > 1 ? 'créations d\'exception trouvées' : 'création d\'exception trouvée'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <p>Aucune œuvre ne correspond à vos filtres de sélection.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setSelectedMaterial('all');
                    setSearchQuery('');
                  }}
                  className={styles.resetButton}
                >
                  Réinitialiser les Filtres
                </button>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
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
                      <span className={styles.cardCategory}>{product.category.toUpperCase()} — {product.brand}</span>
                      <h2 className={styles.cardTitle}>{product.name}</h2>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardPrice}>{product.price.toLocaleString('fr-FR')} DH</span>
                        <span className={styles.exploreLink}>Découvrir</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className={styles.shopContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: 'var(--color-primary-text)' }}>Chargement de la Galerie...</p>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}
