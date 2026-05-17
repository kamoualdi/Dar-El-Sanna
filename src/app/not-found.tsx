import Link from 'next/link';

export default function NotFound() {
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
        Erreur 404
      </span>
      <h1 style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: '400',
        lineHeight: '1.15',
        color: 'var(--color-primary-text)',
        marginBottom: '1.5rem',
        maxWidth: '700px',
      }}>
        Cette création n&apos;existe plus
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(26,26,26,0.6)',
        marginBottom: '3rem',
        maxWidth: '500px',
        lineHeight: '1.7',
      }}>
        L&apos;œuvre que vous recherchez a peut-être été acquise par un collectionneur, ou cette page n&apos;existe pas.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/collections"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'var(--color-primary-text)',
            color: 'var(--color-primary-bg)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'background 0.3s ease',
          }}
        >
          Voir le Catalogue
        </Link>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna%2C%20j%27ai%20trouv%C3%A9%20une%20page%20introuvable%20sur%20votre%20site.`}
          target="_blank"
          rel="noopener noreferrer"
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
          Conciergerie WhatsApp
        </a>
      </div>
    </div>
  );
}
