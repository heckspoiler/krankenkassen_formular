import React from 'react';
import styles from './Franchise.module.css';
import { useStore } from 'zustand';
import { franchiseStore } from '@/utils/stores/franchiseStore';
import { ageStore } from '@/utils/stores/ageStore';

export const Franchise = ({ isActive }) => {
  const { franchise, setFranchise } = useStore(franchiseStore);
  const { age, setAge } = useStore(ageStore);

  let franchiseValues;

  if (age !== 'AKL-KIN') {
    franchiseValues = [
      { code: 'FRAST1', label: '300 CHF' },
      { code: 'FRAST2', label: '500 CHF' },
      { code: 'FRAST3', label: '1000 CHF' },
      { code: 'FRAST4', label: '1500 CHF' },
      { code: 'FRAST5', label: '2000 CHF' },
      { code: 'FRAST6', label: '2500 CHF' },
    ];
  } else {
    franchiseValues = [
      { code: 'FRAST1', label: '0 CHF' },
      { code: 'FRAST2', label: '100 CHF' },
      { code: 'FRAST3', label: '200 CHF' },
      { code: 'FRAST4', label: '300 CHF' },
      { code: 'FRAST5', label: '400 CHF' },
      { code: 'FRAST7', label: '600 CHF' },
    ];
  }

  const handlefranchiseClick = (code) => {
    setFranchise(code);
  };

  return (
    <div name="franchise" id="franchiseSelect" className={styles.Main}>
      <div className={styles.FranchiseContainer}>
        {franchiseValues.map((franchiseValue) => (
          <button
            key={franchiseValue.code}
            className={`${styles.Button} ${franchise === franchiseValue.code ? styles.Active : ''}`}
            value={franchiseValue.code}
            onClick={() => handlefranchiseClick(franchiseValue.code)}
          >
            {franchiseValue.label}
          </button>
        ))}
      </div>
    </div>
  );
};
