import React, { useState } from 'react';
import styles from './CantonRadio.module.css';

import { useStore } from 'zustand';
import { cantonRadioStore } from '@/utils/stores/cantonRadioStore';

export const CantonRadio = () => {
  const { cantonRadio, setCantonRadio } = useStore(cantonRadioStore);

  const handleChange = (event) => {
    setCantonRadio(event.target.value);
  };

  return (
    <section className={styles.Main}>
      <p>Möchten Sie eine Offerte für Ihren aktuellen Wohnsitz?</p>
      <div className={styles.ButtonContainer}>
        <button
          value="Ja"
          onClick={handleChange}
          className={`${styles.Button} ${cantonRadio === 'Ja' ? styles.Active : ''}`}
        >
          Ja
        </button>
        <button
          value="Nein"
          onClick={handleChange}
          className={`${styles.Button} ${cantonRadio === 'Nein' ? styles.Active : ''}`}
        >
          Nein
        </button>
      </div>
    </section>
  );
};
