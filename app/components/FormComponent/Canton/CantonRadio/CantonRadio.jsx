'use client';

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
      <p>
        Möchtest du eine Offerte für den aktuellen oder zukünftigen Wohnsitz?
      </p>
      <div className={styles.ButtonContainer}>
        <button
          value="Ja"
          onClick={handleChange}
          className={`${styles.Button} ${cantonRadio === 'Ja' ? styles.Active : ''}`}
        >
          Aktueller Wohnsitz
        </button>
        <button
          value="Nein"
          onClick={handleChange}
          className={`${styles.Button} ${cantonRadio === 'Nein' ? styles.Active : ''}`}
        >
          Zukünftiger Wohnsitz
        </button>
      </div>
    </section>
  );
};
