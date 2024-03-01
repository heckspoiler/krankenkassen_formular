'use client';

import React, { useState } from 'react';
import styles from './CurrentlyLiving.module.css';
import { useStore } from 'zustand';
import { currentlyLivingStore } from '@/utils/stores/currentlyLivingStore';

export const CurrentlyLiving = () => {
  const { currentlyLiving, setCurrentlyLiving } =
    useStore(currentlyLivingStore);

  const handleChange = (event) => {
    setCurrentlyLiving(event.target.value);
  };

  return (
    <section className={styles.Main}>
      <p>Wohnst du bereits in der Schweiz?</p>
      <div className={styles.ButtonContainer}>
        <button
          value="Ja"
          onClick={handleChange}
          className={`${styles.Button} ${currentlyLiving === 'Ja' ? styles.Active : ''}`}
        >
          Ja
        </button>
        <button
          value="Nein"
          onClick={handleChange}
          className={`${styles.Button} ${currentlyLiving === 'Nein' ? styles.Active : ''}`}
        >
          Nein
        </button>
      </div>
    </section>
  );
};
