'use client';

import { useState, useEffect } from 'react';
import { products } from '../../../../data/products';
import styles from '../../admin.module.css';
import Link from 'next/link';

export default function DashboardPage() {
  const totalProducts = products.length;
  const categoriesCount = new Set(products.map(p => p.category)).size;
  
  // Real stats state
  const [baseCount, setBaseCount] = useState<number>(0);
  const [trafficCount, setTrafficCount] = useState<number>(0);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [inputBase, setInputBase] = useState<string>('0');
  
  // Loading & Saving state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  // Fake stats for UI demonstration
  const visitorsToday = isLoading ? '...' : (24 + Math.round(trafficCount * 0.15));
  const inquiriesThisWeek = 18;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Vue d'ensemble</h1>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Compteur Public Total</h3>
          <div className={styles.metricValue} style={{ color: '#D4AF37' }}>
            {isLoading ? '...' : totalVisits.toLocaleString('fr-MA')}
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Visiteurs Réels (Trafic)</h3>
          <div className={styles.metricValue}>
            {isLoading ? '...' : trafficCount.toLocaleString('fr-MA')}
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Œuvres au Catalogue</h3>
          <div className={styles.metricValue}>{totalProducts}</div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Catégories Actives</h3>
          <div className={styles.metricValue}>{categoriesCount}</div>
        </div>
      </div>

      <div className={styles.formGrid}>
        {/* Statistics configuration */}
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Ajustement du Compteur de Visites</h2>
          <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
            Ajustez la statistique affichée sur le site public en modifiant le nombre de départ. Le total affiché correspond à la <strong>Valeur de Départ</strong> ajoutée aux <strong>Visiteurs Réels</strong> enregistrés par le serveur.
          </p>

          <form onSubmit={handleUpdateStats}>
            <div className={styles.formGroup} style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="baseCount" style={{ fontWeight: 500, fontSize: '0.85rem' }}>Valeur de départ du compteur (Base de seed)</label>
              <input
                type="number"
                id="baseCount"
                className={styles.input}
                value={inputBase}
                onChange={(e) => setInputBase(e.target.value)}
                placeholder="Ex: 12000"
                style={{ fontSize: '0.95rem' }}
                min="0"
                required
                disabled={isLoading}
              />
            </div>

            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f8f9fa', borderRadius: '4px', borderLeft: '3px solid #D4AF37', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <span>Total qui sera visible sur le site : </span>
              <strong style={{ color: '#D4AF37', fontSize: '1rem', marginLeft: '0.25rem' }}>
                {(parseInt(inputBase || '0', 10) + trafficCount).toLocaleString('fr-MA')} visites
              </strong>
            </div>

            {message && (
              <p style={{ 
                color: message.type === 'success' ? '#16a34a' : '#ef4444', 
                fontSize: '0.85rem', 
                fontWeight: 500,
                marginBottom: '1rem' 
              }}>
                {message.text}
              </p>
            )}

            <button 
              type="submit" 
              className={styles.primaryBtn} 
              style={{ backgroundColor: '#D4AF37', color: '#1A1A1A', fontWeight: 600, transition: 'all 0.2s' }}
              disabled={isSaving || isLoading}
            >
              {isSaving ? 'Mise à jour en cours...' : 'Enregistrer la statistique'}
            </button>
          </form>
        </div>

        {/* Info card */}
        <div className={styles.formSection} style={{ alignSelf: 'start' }}>
          <h2 className={styles.formSectionTitle}>Informations Système</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#666' }}>Numéro WhatsApp Actif :</span>
              <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'Non configuré'}</div>
            </div>
            <div>
              <span style={{ color: '#666' }}>Plausible Analytics :</span>
              <div style={{ fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }}></span>
                Actif (darelsanna.ma)
              </div>
            </div>
            <div>
              <span style={{ color: '#666' }}>Base de données :</span>
              <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>products.json (Decap CMS Statique)</div>
            </div>
            <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
              <span style={{ color: '#666', display: 'block', marginBottom: '0.5rem' }}>Gestion du Catalogue :</span>
              <Link 
                href="/admin-cms/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryBtn}
                style={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#D4AF37', 
                  border: '1px solid #D4AF37', 
                  fontWeight: 600, 
                  textAlign: 'center', 
                  display: 'block', 
                  width: '100%',
                  textDecoration: 'none',
                  padding: '0.6rem',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                Gérer le Catalogue (Decap CMS) →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer} style={{ marginTop: '2.5rem' }}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Dernières Œuvres Ajoutées</h2>
          <Link href="/admin/products" className={styles.addBtn} style={{ backgroundColor: '#1A1A1A' }}>Voir tout le catalogue</Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.productImageCell}></th>
              <th>Nom de l'œuvre</th>
              <th>Catégorie</th>
              <th>Prix (MAD)</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} width={40} height={40} className={styles.productImageSmall} />
                </td>
                <td style={{ fontWeight: 500, color: '#1a1a1a' }}>{product.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td>{product.price.toLocaleString('fr-MA')} MAD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
