'use client';

import React from 'react';
import styles from './Age.module.css';
import { useStore } from 'zustand';
import { ageStore } from '@/utils/stores/ageStore';
import { datasetStore } from '@/utils/stores/datasetStore';

export const Age = () => {
  const { age, setAge } = useStore(ageStore);
  const [dataset, setDataset] = useStore(datasetStore).dataset;

  const ageValues = [
    { code: 'AKL-KIN', label: 'Kind 0-18 Jahre' },
    { code: 'AKL-JUG', label: 'Jugendlich 19-25 Jahre' },
    { code: 'AKL-ERW', label: 'Erwachsen 26+ Jahre' },
  ];

  const handleAgeClick = (code) => {
    setAge(code);
  };

  return (
    <div name="age" id="ageSelect" className={styles.Main}>
      <h3>Bitte wählen Sie ihre Alterskategorie</h3>
      <div className={styles.AgeContainer}>
        {ageValues.map((ageValue) => (
          <button
            key={ageValue.code}
            className={`${styles.Button} ${age === ageValue.code ? styles.Active : ''}`}
            value={ageValue.code}
            onClick={() => handleAgeClick(ageValue.code)}
          >
            {ageValue.label.split(' ')[0]} <br /> (
            {ageValue.label.split(' ').slice(1).join(' ')})
          </button>
        ))}
      </div>
    </div>
  );
};
