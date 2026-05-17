'use client';

import { useState, useEffect } from 'react';
import { products } from '../../../../data/products';
import styles from '../../admin.module.css';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'catalog'>('catalog');
  
  // Search and Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Real stats state
  const [baseCount, setBaseCount] = useState<number>(0);
  const [trafficCount, setTrafficCount] = useState<number>(0);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [inputBase, setInputBase] = useState<string>('0');
  
  // Loading & Saving state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Copied state for feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch current stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/visits');
        if (res.ok) {
          const data = await res.json();
          setBaseCount(data.base || 0);
          setTrafficCount(data.count || 0);
          setTotalVisits(data.total || 0);
          setInputBase(String(data.base || 0));
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Handle settings update
  const handleUpdateStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    
    const parsedBase = parseInt(inputBase, 10);
    if (isNaN(parsedBase) || parsedBase < 0) {
      setMessage({ type: 'error', text: 'Veuillez saisir un nombre valide supérieur ou égal à 0.' });
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/visits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base: parsedBase }),
      });

      if (res.ok) {
        const data = await res.json();
        setBaseCount(data.base);
        setTrafficCount(data.count);
        setTotalVisits(data.total);
        setMessage({ type: 'success', text: 'Les statistiques du compteur ont été mises à jour avec succès.' });
      } else {
        setMessage({ type: 'error', text: 'Une erreur est survenue lors de la mise à jour.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur réseau : impossible de joindre l\'API.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Financial and database metrics
  const totalProductsCount = products.length;
  const categoriesCount = new Set(products.map(p => p.category)).size;
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);
  const averagePrice = Math.round(totalCatalogValue / totalProductsCount);

  // Category labels and colors helper
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'parfumerie':
        return { bg: 'rgba(139, 0, 0, 0.07)', color: '#8B0000', label: 'Parfumerie' };
      case 'bijouterie':
        return { bg: 'rgba(0, 100, 80, 0.07)', color: '#006450', label: 'Bijouterie' };
      case 'horlogerie':
        return { bg: 'rgba(25, 25, 112, 0.07)', color: '#191970', label: 'Horlogerie' };
      case 'antiquites':
        return { bg: 'rgba(184, 134, 11, 0.1)', color: '#8A640F', label: 'Antiquités' };
      default:
        return { bg: '#f1f1f1', color: '#666', label: category };
    }
  };

  // WhatsApp concierge message builder for delegation
  const copyWhatsAppLink = (product: typeof products[0]) => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000';
    const text = `Bonjour Dar El Sanna, je souhaiterais acquérir ou obtenir plus de détails concernant la pièce d'exception suivante : "${product.name}" (${product.brand}) d'une valeur de ${product.price.toLocaleString('fr-MA')} MAD.`;
    const link = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    
    navigator.clipboard.writeText(link);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <>
      {/* Premium Dashboard Title Block */}
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 className={styles.pageTitle} style={{ margin: 0, fontWeight: 400, fontFamily: 'var(--font-playfair)' }}>
            Espace d'Administration
          </h1>
          <p style={{ color: '#666', margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
            Pilotage et analyse du catalogue de prestige Dar El Sanna
          </p>
        </div>
        
        {/* Quick access to Decap CMS */}
        <Link 
          href="/admin-cms/index.html" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#1A1A1A',
            color: '#D4AF37',
            border: '1px solid #D4AF37',
            textDecoration: 'none',
            fontSize: '0.85rem',
            padding: '0.65rem 1.25rem',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = '#1A1A1A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A1A1A'; e.currentTarget.style.color = '#D4AF37'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Modifier le Catalogue (Decap CMS)
        </Link>
      </div>

      {/* Tabs Selector Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eaeaea', marginBottom: '2rem', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('catalog')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'catalog' ? '2px solid #D4AF37' : '2px solid transparent',
            color: activeTab === 'catalog' ? '#1A1A1A' : '#777',
            fontWeight: activeTab === 'catalog' ? 600 : 500,
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
          💎 Catalogue Général ({filteredProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'metrics' ? '2px solid #D4AF37' : '2px solid transparent',
            color: activeTab === 'metrics' ? '#1A1A1A' : '#777',
            fontWeight: activeTab === 'metrics' ? 600 : 500,
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          📊 Configuration & Visites
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: CATALOG GENERAL (PROFESSIONAL TABLE & SEARCH & STATS)         */}
      {/* ==================================================================== */}
      {activeTab === 'catalog' && (
        <div>
          {/* Dynamic Financial Overview */}
          <div className={styles.metricsGrid} style={{ marginBottom: '2rem' }}>
            <div className={styles.metricCard} style={{ borderLeft: '3px solid #D4AF37' }}>
              <h3 className={styles.metricTitle}>Valeur du Catalogue</h3>
              <div className={styles.metricValue} style={{ fontSize: '1.75rem', fontWeight: 500 }}>
                {totalCatalogValue.toLocaleString('fr-MA')} MAD
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Estimation globale des 20 œuvres de luxe</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Prix Moyen de Vente</h3>
              <div className={styles.metricValue} style={{ fontSize: '1.75rem', fontWeight: 500 }}>
                {averagePrice.toLocaleString('fr-MA')} MAD
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Par œuvre d'artisanat ou de niche</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Œuvres Répertoriées</h3>
              <div className={styles.metricValue} style={{ fontSize: '1.75rem', fontWeight: 500 }}>
                {totalProductsCount}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Divisées en {categoriesCount} univers d'exception</p>
            </div>
          </div>

          {/* Search, Category Filters, and Table Container */}
          <div style={{ backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.015)' }}>
            
            {/* Search and Filters Header bar */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Search input field */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Rechercher par nom, marque, ID unique ou matière d'une œuvre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>

              {/* Category selector pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '0.5rem' }}>
                  Filtrer par :
                </span>
                
                {[
                  { id: 'all', label: 'Toutes les œuvres' },
                  { id: 'parfumerie', label: 'Parfums' },
                  { id: 'bijouterie', label: 'Bijoux' },
                  { id: 'horlogerie', label: 'Montres' },
                  { id: 'antiquites', label: 'Antiquités' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '50px',
                      border: selectedCategory === cat.id ? '1px solid #D4AF37' : '1px solid #ddd',
                      backgroundColor: selectedCategory === cat.id ? '#1A1A1A' : '#ffffff',
                      color: selectedCategory === cat.id ? '#D4AF37' : '#555',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== cat.id) {
                        e.currentTarget.style.borderColor = '#D4AF37';
                        e.currentTarget.style.color = '#D4AF37';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== cat.id) {
                        e.currentTarget.style.borderColor = '#ddd';
                        e.currentTarget.style.color = '#555';
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                ))}

                {/* Filter statistics indicator */}
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
                  {filteredProducts.length} œuvre{filteredProducts.length > 1 ? 's' : ''} trouvée{filteredProducts.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Main Products Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa' }}>
                    <th style={{ padding: '1rem 1.5rem', width: '70px' }}>Visuel</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Désignation / ID</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Maison / Artisan</th>
                    <th style={{ padding: '1rem 1.5rem', width: '150px' }}>Catégorie</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right', width: '130px' }}>Prix public</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'center', width: '220px' }}>Actions de Vente</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '0.75rem' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <p style={{ margin: 0, fontWeight: 500 }}>Aucune œuvre ne correspond à vos critères de recherche.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => {
                      const badge = getCategoryBadgeStyle(product.category);
                      return (
                        <tr 
                          key={product.id} 
                          style={{ borderBottom: '1px solid #f2f2f2', transition: 'background-color 0.15s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fbfbfb'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {/* Image cell */}
                          <td style={{ padding: '0.85rem 1.5rem' }}>
                            <div style={{ width: '48px', height: '48px', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid #eaeaea', backgroundColor: '#f9f9f9' }}>
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                            </div>
                          </td>
                          
                          {/* Name & ID cell */}
                          <td style={{ padding: '0.85rem 1.5rem' }}>
                            <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{product.name}</div>
                            <code style={{ fontSize: '0.7rem', color: '#888', backgroundColor: '#f5f5f5', padding: '0.1rem 0.3rem', borderRadius: '3px', marginTop: '0.2rem', display: 'inline-block' }}>
                              ID: {product.id}
                            </code>
                          </td>
                          
                          {/* Brand cell */}
                          <td style={{ padding: '0.85rem 1.5rem', fontSize: '0.85rem', color: '#555' }}>
                            {product.brand}
                          </td>
                          
                          {/* Category Badge cell */}
                          <td style={{ padding: '0.85rem 1.5rem' }}>
                            <span style={{ 
                              display: 'inline-block',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: badge.bg,
                              color: badge.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {badge.label}
                            </span>
                          </td>
                          
                          {/* Price cell */}
                          <td style={{ padding: '0.85rem 1.5rem', textAlign: 'right', fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                            {product.price.toLocaleString('fr-MA')} MAD
                          </td>
                          
                          {/* Custom Actions cell */}
                          <td style={{ padding: '0.85rem 1.5rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                              
                              {/* Open product live */}
                              <Link 
                                href={`/collections/${product.category}/${product.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Voir la page de l'œuvre sur le site"
                                style={{
                                  padding: '0.45rem',
                                  borderRadius: '4px',
                                  border: '1px solid #ddd',
                                  backgroundColor: '#fff',
                                  color: '#333',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eaeaea'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                              </Link>
                              
                              {/* Direct edit inside Decap CMS */}
                              <Link
                                href={`/admin-cms/index.html#/collections/catalog/entries/products`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Modifier dans le CMS"
                                style={{
                                  padding: '0.45rem',
                                  borderRadius: '4px',
                                  border: '1px solid rgba(212, 175, 55, 0.4)',
                                  backgroundColor: 'rgba(212, 175, 55, 0.05)',
                                  color: '#8A640F',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                              </Link>

                              {/* WhatsApp Concierge direct link generator */}
                              <button
                                onClick={() => copyWhatsAppLink(product)}
                                title="Copier le lien d'acquisition WhatsApp Concierge"
                                style={{
                                  padding: '0.45rem 0.75rem',
                                  borderRadius: '4px',
                                  border: '1px solid #16a34a',
                                  backgroundColor: copiedId === product.id ? '#16a34a' : 'rgba(22, 163, 74, 0.05)',
                                  color: copiedId === product.id ? '#fff' : '#16a34a',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.3rem',
                                  transition: 'all 0.2s ease',
                                  outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                  if (copiedId !== product.id) {
                                    e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.15)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (copiedId !== product.id) {
                                    e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.05)';
                                  }
                                }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  {copiedId === product.id ? (
                                    <polyline points="20 6 9 17 4 12"/>
                                  ) : (
                                    <>
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                                    </>
                                  )}
                                </svg>
                                {copiedId === product.id ? 'Copié !' : 'Partager'}
                              </button>

                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: METRICS & TRAFFIC SETTINGS (COMPTEUR VISITES & SYSTEM INFO)  */}
      {/* ==================================================================== */}
      {activeTab === 'metrics' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          {/* Visitor stats cards */}
          <div className={styles.metricsGrid} style={{ marginBottom: '2rem' }}>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Compteur Public Total</h3>
              <div className={styles.metricValue} style={{ color: '#D4AF37', fontSize: '2rem' }}>
                {isLoading ? '...' : totalVisits.toLocaleString('fr-MA')}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Statistique affichée sur le site public</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Visiteurs Réels (Serveur)</h3>
              <div className={styles.metricValue} style={{ fontSize: '2rem' }}>
                {isLoading ? '...' : trafficCount.toLocaleString('fr-MA')}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Trafic mesuré de manière organique</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Seed de départ</h3>
              <div className={styles.metricValue} style={{ fontSize: '2rem' }}>
                {isLoading ? '...' : baseCount.toLocaleString('fr-MA')}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#888', fontSize: '0.75rem' }}>Valeur ajoutée de départ (statique)</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* Left Column: Form to update statistics */}
            <div className={styles.formSection} style={{ border: '1px solid #eaeaea' }}>
              <h2 className={styles.formSectionTitle} style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid #eaeaea', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                Ajustement du Compteur de Visites (Prestige Seed)
              </h2>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Configurez la valeur de départ affichée sur la galerie. La valeur totale affichée en bas de page correspond à la somme de votre <strong>valeur de départ</strong> et des <strong>visiteurs uniques réels</strong> enregistrés par nos serveurs.
              </p>

              <form onSubmit={handleUpdateStats}>
                <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="baseCount" style={{ fontWeight: 600, fontSize: '0.8rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.5rem' }}>
                    Valeur de départ du compteur
                  </label>
                  <input
                    type="number"
                    id="baseCount"
                    className={styles.input}
                    value={inputBase}
                    onChange={(e) => setInputBase(e.target.value)}
                    placeholder="Ex: 12000"
                    style={{ fontSize: '0.95rem', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                    min="0"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Calculation breakdown widget */}
                <div style={{ 
                  padding: '1rem 1.25rem', 
                  backgroundColor: '#fafafa', 
                  borderRadius: '6px', 
                  borderLeft: '4px solid #D4AF37', 
                  marginBottom: '1.5rem', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ color: '#666', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Formule visible sur le site</span>
                    <span style={{ fontSize: '0.85rem', color: '#333' }}>
                      {parseInt(inputBase || '0', 10).toLocaleString('fr-MA')} (base) + {trafficCount} (réels) =
                    </span>
                  </div>
                  <strong style={{ color: '#B8860B', fontSize: '1.15rem' }}>
                    {(parseInt(inputBase || '0', 10) + trafficCount).toLocaleString('fr-MA')} visites
                  </strong>
                </div>

                {/* API feedback messaging */}
                {message && (
                  <div style={{ 
                    padding: '0.75rem 1rem', 
                    borderRadius: '4px', 
                    fontSize: '0.85rem', 
                    fontWeight: 500,
                    marginBottom: '1.25rem',
                    backgroundColor: message.type === 'success' ? 'rgba(22, 163, 74, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    color: message.type === 'success' ? '#16a34a' : '#ef4444',
                    border: message.type === 'success' ? '1px solid rgba(22, 163, 74, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                  }}>
                    {message.text}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={styles.primaryBtn} 
                  style={{ 
                    backgroundColor: '#D4AF37', 
                    color: '#1A1A1A', 
                    fontWeight: 700, 
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    padding: '0.85rem 1.5rem',
                    width: 'auto',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 10px rgba(212,175,55,0.15)'
                  }}
                  disabled={isSaving || isLoading}
                >
                  {isSaving ? 'Mise à jour en cours...' : 'Enregistrer et synchroniser'}
                </button>
              </form>
            </div>

            {/* Right Column: System info and connections */}
            <div className={styles.formSection} style={{ alignSelf: 'start', border: '1px solid #eaeaea' }}>
              <h2 className={styles.formSectionTitle} style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid #eaeaea', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                Informations d'Écosystème
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
                
                <div>
                  <span style={{ color: '#888', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>
                    Numéro WhatsApp Concierge
                  </span>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#888', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>
                    Plausible Analytics (SEO)
                  </span>
                  <div style={{ fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }}></span>
                    Actif (darelsanna.ma)
                  </div>
                </div>

                <div>
                  <span style={{ color: '#888', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>
                    Base de données Catalogue
                  </span>
                  <div style={{ fontWeight: 600, color: '#1a1a1a' }}>
                    products.json (Version CMS Statique)
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <span style={{ color: '#888', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                    Infrastructure Cloud Netlify
                  </span>
                  <Link 
                    href="https://app.netlify.com/projects/dar-el-sanna" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      backgroundColor: '#f5f5f5', 
                      color: '#333', 
                      border: '1px solid #ddd', 
                      fontWeight: 600, 
                      textAlign: 'center', 
                      display: 'block', 
                      width: '100%',
                      textDecoration: 'none',
                      padding: '0.55rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eaeaea'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                  >
                    Console d'Hébergement Netlify →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
