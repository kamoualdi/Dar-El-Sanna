import { products } from '../../../../data/products';
import styles from '../../admin.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Administration',
};

export default function DashboardPage() {
  const totalProducts = products.length;
  const categoriesCount = new Set(products.map(p => p.category)).size;
  
  // Fake stats for UI demonstration
  const visitorsToday = 142;
  const inquiriesThisWeek = 18;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Vue d'ensemble</h1>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Visiteurs Uniques (Aujourd'hui)</h3>
          <div className={styles.metricValue}>{visitorsToday}</div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Œuvres au Catalogue</h3>
          <div className={styles.metricValue}>{totalProducts}</div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Catégories Actives</h3>
          <div className={styles.metricValue}>{categoriesCount}</div>
        </div>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Demandes Conciergerie (7j)</h3>
          <div className={styles.metricValue}>{inquiriesThisWeek}</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Dernières Œuvres Ajoutées</h2>
          <Link href="/admin/products" className={styles.addBtn}>Voir tout le catalogue</Link>
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
                <td style={{ fontWeight: 500, color: '#333' }}>{product.name}</td>
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
