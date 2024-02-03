'use client';

import styles from './OfferList.module.css';

import { useStore } from 'zustand';
import { datasetStore } from '@/utils/stores/datasetStore';

export function OfferList() {
  const dataset = useStore(datasetStore).dataset;
  return (
    <main className={styles.Main}>
      <h2 className={styles.title}>Angebote</h2>
      <div className={styles.OfferList}>
        {dataset.map((offer, index) => {
          return (
            <div key={index} className={styles.Offer}>
              <h3 className={styles.OfferTitle}>{offer.versicherer}</h3>
              <p className={styles.OfferText}>{offer.praemie} CHF pro Monat</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
