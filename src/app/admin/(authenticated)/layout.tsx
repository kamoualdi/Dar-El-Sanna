'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../admin.module.css';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/admin/dashboard" className={styles.logo}>
            Dar El Sanna
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link 
            href="/admin/dashboard" 
            className={`${styles.navLink} ${pathname === '/admin/dashboard' ? styles.navLinkActive : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Vue d'ensemble
          </Link>
          <Link 
            href="/admin/products" 
            className={`${styles.navLink} ${pathname.startsWith('/admin/products') ? styles.navLinkActive : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            Catalogue & Œuvres
          </Link>
          <Link 
            href="/admin/conciergerie" 
            className={`${styles.navLink} ${pathname === '/admin/conciergerie' ? styles.navLinkActive : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.9a8.38 8.38 0 0 1 3.8.9L21 3l-1.9 3.8Z"></path></svg>
            Conciergerie
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/admin" className={styles.logoutBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.userProfile}>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Conciergerie Royale</span>
            <div className={styles.avatar}>CR</div>
          </div>
        </header>
        <main className={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}
