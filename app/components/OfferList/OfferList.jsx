'use client';

import styles from './OfferList.module.css';

import { useStore } from 'zustand';
import { datasetStore } from '@/utils/stores/datasetStore';

export function OfferList() {
  const dataset = useStore(datasetStore).dataset;

  const sortedDataset = [...dataset].sort(
    (a, b) => parseFloat(a.praemie) - parseFloat(b.praemie)
  );

  return (
    <main className={styles.Main}>
      <div className={styles.OfferList}>
        {sortedDataset.map((offer, index) => {
          const formattedPraemie =
            parseFloat(offer.praemie).toFixed(2) + ' CHF/Monat';

          let versichererName = offer.versicherer.replace('�KK', 'ÖKK');
          versichererName = versichererName
            .replace(
              /KRANKENVERSICHERUNG|VERSICHERUNG|Krankenversicherung AG|GESUNDHEITSVERSICHERUNG AG/gi,
              ''
            )
            .trim();

          return (
            <div key={index} className={styles.Offer}>
              <div className={styles.TextContainer}>
                <h3 className={styles.OfferTitle}>{versichererName}</h3>
                <p className={styles.OfferText}>{offer.tarif}</p>
              </div>
              <div className={styles.TextContainer}>
                <p className={styles.PraemieText}>{formattedPraemie}</p>
                <button
                  className={styles.Button}
                  key={index}
                  name={offer.tarif}
                >
                  Offerte einholen
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
