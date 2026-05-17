'use client';

import { products } from '../../../../data/products';
import styles from '../../admin.module.css';
import Link from 'next/link';

export default function ProductsPage() {
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'œuvre "${name}" ? (Cette action n'est pas persistée en démo)`)) {
      alert("L'œuvre a été supprimée visuellement de cette session.");
      // In a real app, you would call an API here.
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Catalogue des Œuvres</h1>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Toutes les créations ({products.length})</h2>
          <Link href="/admin/products/new" className={styles.addBtn}>+ Ajouter une Œuvre</Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.productImageCell}></th>
              <th>Nom de l'œuvre</th>
              <th>Catégorie</th>
              <th>Prix (MAD)</th>
              <th>Artisan / Origine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} width={40} height={40} className={styles.productImageSmall} />
                </td>
                <td style={{ fontWeight: 500, color: '#333' }}>{product.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td>{product.price.toLocaleString('fr-MA')} MAD</td>
                <td>{product.artisanOrigin || product.brand}</td>
                <td>
                  <div className={styles.actionLinks}>
                    <Link href="#" className={styles.editLink} onClick={(e) => { e.preventDefault(); alert('Fonctionnalité Éditer à venir'); }}>Éditer</Link>
                    <button 
                      onClick={() => handleDelete(product.id, product.name)} 
                      className={styles.deleteLink}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
