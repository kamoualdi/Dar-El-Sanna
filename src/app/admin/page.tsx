'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    if (password === 'admin2026') {
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect. (Indice: admin2026)');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginLogo}>Dar El Sanna</h1>
        <p className={styles.loginSubtitle}>Administration & Conciergerie</p>
        
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe d'accès</label>
            <input 
              type="password" 
              id="password"
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
          
          <button type="submit" className={styles.primaryBtn}>
            Accéder au Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
