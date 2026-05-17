'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorCounter.module.css';

const API_NAMESPACE = 'darelsanna';
const API_KEY = 'visitors';
const STORAGE_KEY = 'des_visited';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const visited = localStorage.getItem(STORAGE_KEY);
        let value: number;

        if (!visited) {
          const res = await fetch(
            `https://api.countapi.xyz/hit/${API_NAMESPACE}/${API_KEY}`
          );
          const data = await res.json();
          value = data.value;
          localStorage.setItem(STORAGE_KEY, 'true');
        } else {
          const res = await fetch(
            `https://api.countapi.xyz/get/${API_NAMESPACE}/${API_KEY}`
          );
          const data = await res.json();
          value = data.value;
        }

        if (!cancelled) setCount(value);
      } catch {
        if (!cancelled) setCount(null);
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  if (count === null) return null;

  return (
    <span className={styles.counter}>
      {count.toLocaleString('fr-FR')} visiteur{count > 1 ? 's' : ''}
    </span>
  );
}
