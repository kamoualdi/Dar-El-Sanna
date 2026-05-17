'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'var(--color-primary-bg)',
    }}>
      <span style={{
        fontSize: '0.85rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--color-accent-gold)',
        fontWeight: '600',
        display: 'block',
        marginBottom: '1.5rem',
      }}>
        Erreur Technique
      </span>
      <h1 style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
        fontWeight: '400',
        lineHeight: '1.15',
        color: 'var(--color-primary-text)',
        marginBottom: '1.5rem',
        maxWidth: '700px',
      }}>
        Une erreur inattendue s'est produite.
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(26,26,26,0.6)',
        marginBottom: '3rem',
        maxWidth: '500px',
        lineHeight: '1.7',
      }}>
        Notre équipe a été notifiée. Veuillez réessayer de rafraîchir la page ou retourner à l'accueil.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'var(--color-primary-text)',
            color: 'var(--color-primary-bg)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Rafraîchir
        </button>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            border: '1px solid var(--color-accent-gold)',
            color: 'var(--color-accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}
        >
          Retour à l'Accueil
        </Link>
      </div>
    </div>
  );
}
