'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setMessage('Impossible de se connecter au serveur.');
    }
  };

  return (
    <footer id="public-footer" className={styles.footer} role="contentinfo" aria-label="Pied de page">
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>Dar El Sanna</div>
          <p className={styles.description}>
            L'héritage des Maâlems, réinventé pour le luxe contemporain. Chaque pièce est unique et raconte une histoire.
          </p>
        </div>

        <div>
          <h3 className={styles.title}>Boutique</h3>
          <ul className={styles.links}>
            <li><Link href="/collections?category=bijouterie" className={styles.link}>Haute Joaillerie</Link></li>
            <li><Link href="/collections?category=horlogerie" className={styles.link}>Haute Horlogerie</Link></li>
            <li><Link href="/collections?category=parfumerie" className={styles.link}>Haute Parfumerie</Link></li>
            <li><Link href="/collections?category=antiquites" className={styles.link}>Antiquités Rares</Link></li>
            <li><Link href="/collections" className={styles.link}>Éditions Privées</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Maison</h3>
          <ul className={styles.links}>
            <li><Link href="/collections" className={styles.link}>Catalogue</Link></li>
            <li><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna`} target="_blank" rel="noopener noreferrer" className={styles.link}>Conciergerie WhatsApp</a></li>
            <li><Link href="/faq" className={styles.link}>Questions Fréquentes</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Newsletter</h3>
          <div className={styles.newsletter}>
            <p className={styles.link}>Inscrivez-vous pour découvrir nos éditions privées.</p>
            <form className={styles.inputGroup} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Votre adresse email"
                aria-label="Email pour la newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : "S'inscrire"}
              </button>
            </form>
            {message && (
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.85rem',
                color: status === 'success' ? '#4ade80' : '#f87171',
              }} role="status">{message}</p>
            )}
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Dar El Sanna. Tous droits réservés. — <Link href="/cgu" className={styles.link}>CGU & CGV (Droit Marocain)</Link></p>
        <p>Conçu avec passion pour l'artisanat marocain.</p>
      </div>
    </footer>
  );
}
