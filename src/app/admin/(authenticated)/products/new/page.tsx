'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../admin.module.css';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("L'œuvre a été ajoutée visuellement avec succès ! (Note : En mode démo statique, la donnée n'est pas sauvegardée de façon permanente).");
    router.push('/admin/products');
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <Link href="/admin/products" style={{ color: '#666', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          ← Retour au catalogue
        </Link>
        <h1 className={styles.pageTitle}>Ajouter une Création</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Left Column - Main Info */}
        <div>
          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>Informations Générales</h2>
            
            <div className={styles.formGroup}>
              <label>Nom de l'œuvre *</label>
              <input type="text" className={styles.input} required placeholder="Ex: Collier Zellige" />
            </div>

            <div className={styles.formGroup}>
              <label>Maison ou Artisan (Marque)</label>
              <input type="text" className={styles.input} placeholder="Ex: Dar El Sanna" />
            </div>

            <div className={styles.formGroup}>
              <label>Description *</label>
              <textarea className={styles.textarea} required placeholder="Racontez l'histoire de cette création..."></textarea>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>Spécifications & Matières</h2>
            
            <div className={styles.formGroup}>
              <label>Matériau Principal</label>
              <input type="text" className={styles.input} placeholder="Ex: Or 18k, Cuir, Bois de cèdre..." />
            </div>
            
            <div className={styles.formGroup}>
              <label>Origine / Atelier</label>
              <input type="text" className={styles.input} placeholder="Ex: Fès, Maroc" />
            </div>
          </div>
        </div>

        {/* Right Column - Meta & Media */}
        <div>
          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>Classification</h2>
            
            <div className={styles.formGroup}>
              <label>Catégorie *</label>
              <select className={styles.input} required defaultValue="">
                <option value="" disabled>Sélectionner une catégorie</option>
                <option value="bijouterie">Bijouterie</option>
                <option value="horlogerie">Horlogerie</option>
                <option value="parfumerie">Parfumerie</option>
                <option value="antiquites">Antiquités Rares</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Prix (MAD) *</label>
              <input type="number" className={styles.input} required min="0" placeholder="0" />
            </div>

            <div className={styles.formGroup}>
              <label>Badge Exclusivité</label>
              <select className={styles.input} defaultValue="">
                <option value="">Aucun</option>
                <option value="Pièce Unique">Pièce Unique</option>
                <option value="Édition Limitée">Édition Limitée</option>
                <option value="Édition Privée">Édition Privée</option>
              </select>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>Média</h2>
            
            <div className={styles.formGroup}>
              <label>URL de la photographie *</label>
              <input type="url" className={styles.input} required placeholder="https://..." />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                En mode démo, utilisez une URL d'image existante.
              </p>
            </div>
          </div>

          <button type="submit" className={styles.primaryBtn} style={{ padding: '1rem', fontSize: '1.1rem' }}>
            Enregistrer l'Œuvre
          </button>
        </div>
      </form>
    </>
  );
}
