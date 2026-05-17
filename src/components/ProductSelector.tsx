'use client';

import { useState } from 'react';
import styles from './ProductSelector.module.css';
import { Product } from '../data/products';

interface ProductSelectorProps {
  product: Product;
  whatsappNumber: string;
}

export default function ProductSelector({ product, whatsappNumber }: ProductSelectorProps) {
  const isPerfume = product.category === 'parfumerie';
  const [selectedVolume, setSelectedVolume] = useState<'20ml' | '50ml' | '100ml'>('100ml');

  // Premium Pricing Calculation Rule:
  // - 100ml: Reference Price (base price)
  // - 50ml: 60% of 100ml price, rounded to the nearest 10 MAD for luxury formatting.
  // - 20ml: 30% of 100ml price, rounded to the nearest 10 MAD for luxury formatting.
  const getPriceForVolume = (basePrice: number, volume: '20ml' | '50ml' | '100ml') => {
    if (volume === '100ml') return basePrice;
    if (volume === '50ml') return Math.round((basePrice * 0.60) / 10) * 10;
    if (volume === '20ml') return Math.round((basePrice * 0.30) / 10) * 10;
    return basePrice;
  };

  const currentPrice = isPerfume ? getPriceForVolume(product.price, selectedVolume) : product.price;
  const currentVolumeLabel = selectedVolume === '20ml' ? '20 ml' : selectedVolume === '50ml' ? '50 ml' : '100 ml';

  // Build high-end contextual WhatsApp messages
  const purchaseMessage = isPerfume
    ? `Bonjour Dar El Sanna, je souhaite acquérir la création olfactive d'exception "${product.name}" (${product.brand}) en format flacon de ${currentVolumeLabel} au prix exclusif de ${currentPrice.toLocaleString('fr-MA')} MAD.`
    : `Bonjour Dar El Sanna, je souhaite acquérir la création d'exception "${product.name}" (${product.brand}) au prix de ${product.price.toLocaleString('fr-MA')} MAD.`;

  const personalizationMessage = isPerfume
    ? `Bonjour Dar El Sanna, je souhaite contacter votre Conciergerie Royale pour demander un flacon personnalisé ou obtenir des détails sur le sillage "${product.name}" (${product.brand}) en format ${currentVolumeLabel}.`
    : `Bonjour Dar El Sanna, je souhaite contacter votre Conciergerie Royale pour demander une personnalisation ou obtenir des détails sur la création "${product.name}" (${product.brand}).`;

  return (
    <div className={styles.selectorContainer}>
      {/* Price display with real-time updates */}
      <p className={styles.productPrice}>
        {currentPrice.toLocaleString('fr-MA')} MAD
        {isPerfume && <span style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(26,26,26,0.5)', marginLeft: '0.8rem' }}>• Format {currentVolumeLabel}</span>}
      </p>

      {/* Elegant volume grid options (Only for Parfumerie category) */}
      {isPerfume && (
        <div className={styles.volumeSelectorSection}>
          <span className={styles.selectorLabel}>Format & Volume Flacon</span>
          <div className={styles.optionsGrid}>
            {(['20ml', '50ml', '100ml'] as const).map((volume) => {
              const price = getPriceForVolume(product.price, volume);
              const label = volume === '20ml' ? '20 ml' : volume === '50ml' ? '50 ml' : '100 ml';
              const isSelected = selectedVolume === volume;
              return (
                <button
                  key={volume}
                  type="button"
                  className={`${styles.optionCard} ${isSelected ? styles.activeOption : ''}`}
                  onClick={() => setSelectedVolume(volume)}
                  aria-label={`Choisir le format ${label} au prix de ${price} dirhams`}
                >
                  <span className={styles.optionVolume}>{label}</span>
                  <span className={styles.optionPrice}>{price.toLocaleString('fr-MA')} MAD</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons with real-time dynamically built links */}
      <div className={styles.actionBlock}>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(purchaseMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryCta}
        >
          Acquérir cette création via WhatsApp
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(personalizationMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryCta}
        >
          {isPerfume ? "Personnaliser mon flacon (WhatsApp)" : "Demander une personnalisation (WhatsApp)"}
        </a>
      </div>
    </div>
  );
}
