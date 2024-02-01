import React from 'react';
import styles from './Accident.module.css';
import { useStore } from 'zustand';
import { accidentStore } from '@/utils/stores/accidentStore';
import { datasetStore } from '@/utils/stores/datasetStore';

export const Accident = ({ isActive }) => {
  const { accident, setAccident } = useStore(accidentStore);
  const [dataset, setDataset] = useStore(datasetStore).dataset;

  const accidentValues = [
    { code: 'MIT-UNF', label: 'Mit Unfallversicherung' },
    { code: 'OHN-UNF', label: 'Ohne Unfallversicherung' },
  ];

  const handleaccidentClick = (code) => {
    setAccident(code);
  };

  return (
    <div name="accident" id="accidentSelect" className={styles.Main}>
      <h3>Möchten Sie eine Unfallversicherung?</h3>
      <div className={styles.AccidentContainer}>
        {accidentValues.map((accidentValue) => (
          <button
            key={accidentValue.code}
            className={`${styles.Button} ${accident === accidentValue.code ? styles.Active : ''}`}
            value={accidentValue.code}
            onClick={() => handleaccidentClick(accidentValue.code)}
          >
            {accidentValue.label}
          </button>
        ))}
      </div>
    </div>
  );
};
