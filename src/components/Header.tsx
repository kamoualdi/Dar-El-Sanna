'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="public-header" className={styles.header} role="banner" aria-label="Navigation principale">
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          Dar El Sanna
        </Link>

        {/* Bouton Hamburger Mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={menuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={menuOpen ? styles.hamburgerOpen : ''}></span>
        </button>

        {/* Navigation Desktop */}
        <nav className={styles.desktopNav}>
          <ul className={styles.menu}>
            <li><Link href="/collections?category=bijouterie" className={styles.menuLink}>Bijouterie</Link></li>
            <li><Link href="/collections?category=horlogerie" className={styles.menuLink}>Horlogerie</Link></li>
            <li><Link href="/collections?category=parfumerie" className={styles.menuLink}>Parfumerie</Link></li>
            <li><Link href="/collections?category=antiquites" className={styles.menuLink}>Antiquités</Link></li>
            <li><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna`} target="_blank" rel="noopener noreferrer" className={styles.menuLink}>Conciergerie</a></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/collections" className={styles.iconButton} aria-label="Recherche">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </Link>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna`} target="_blank" rel="noopener noreferrer" className={styles.iconButton} aria-label="WhatsApp Conciergerie">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.9a8.38 8.38 0 0 1 3.8.9L21 3l-1.9 3.8Z"></path></svg>
          </a>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav aria-label="Menu mobile">
            <ul className={styles.mobileMenuList}>
              <li><Link href="/collections?category=bijouterie" onClick={() => setMenuOpen(false)}>Haute Bijouterie</Link></li>
              <li><Link href="/collections?category=horlogerie" onClick={() => setMenuOpen(false)}>Haute Horlogerie</Link></li>
              <li><Link href="/collections?category=parfumerie" onClick={() => setMenuOpen(false)}>Haute Parfumerie</Link></li>
              <li><Link href="/collections?category=antiquites" onClick={() => setMenuOpen(false)}>Antiquités Rares</Link></li>
              <li><Link href="/collections" onClick={() => setMenuOpen(false)}>Tout le Catalogue</Link></li>
              <li><Link href="/faq" onClick={() => setMenuOpen(false)}>Questions Fréquentes</Link></li>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Conciergerie WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
