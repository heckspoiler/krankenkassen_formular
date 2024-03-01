'use client';

import styles from './OfferList.module.css';

import { useStore } from 'zustand';
import { datasetStore } from '@/utils/stores/datasetStore';
import { contactFormStore } from '@/utils/stores/contactStore';
import { franchiseStore } from '@/utils/stores/franchiseStore';
import { fetchStore } from '@/utils/stores/fetchStore';
import { offerStore } from '@/utils/stores/offerStore';

export function OfferList({ isActive, setIsActive }) {
  const dataset = useStore(datasetStore).dataset;
  const { showForm, setShowForm } = useStore(contactFormStore);
  const { fetch, setFetch } = useStore(fetchStore);
  const {versicherung, praemie, tarif, setOffer} = useStore(offerStore)

  const sortedDataset = [...dataset].sort(
    (a, b) => parseFloat(a.praemie) - parseFloat(b.praemie)
  );


  const showFormClick = (e) => {
    e.preventDefault();
    !showForm ? setShowForm(true) : setShowForm(false);
    console.log('showForm', showForm);
  };

  const anotherFranchise = () => {
    setIsActive(4);
    setFetch(false);
  };

  return (
    <section className={styles.Main}>
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
            <div>
              <div key={offer.tarif} className={styles.Offer}>
                <div className={styles.TextContainer}>
                  <h3 className={styles.OfferTitle}>{versichererName}</h3>
                  <p className={styles.OfferText}>
                    Tarif für: <strong>{offer.tarif}</strong>
                  </p>
                  <button
                  
                    className={styles.FranchiseButton}
                    key={offer.tarif}
                    name={offer.tarif}
                    onClick={anotherFranchise}
                  >
                    Franchise ändern
                  </button>
                </div>
                <div className={styles.TextContainer}>
                  <p className={styles.PraemieText}>{formattedPraemie}</p>
                  <button
                    className={styles.Button}
                    key={offer.tarif}
                    name={offer.tarif}
                    onClick={() => showFormClick(offer)}
                  >
                    Offerte einholen
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
