'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ textAlign: 'center', padding: '5rem', fontFamily: 'sans-serif' }}>
          <h2>Erreur Critique</h2>
          <p>L'application a rencontré une erreur fatale.</p>
          <button onClick={() => reset()} style={{ padding: '1rem', marginTop: '1rem' }}>
            Recharger l'application
          </button>
        </div>
      </body>
    </html>
  );
}
