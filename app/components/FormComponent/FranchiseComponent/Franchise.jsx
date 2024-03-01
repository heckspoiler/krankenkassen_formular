import React from 'react';
import styles from './Franchise.module.css';
import { useStore } from 'zustand';
import { franchiseStore } from '@/utils/stores/franchiseStore';
import { datasetStore } from '@/utils/stores/datasetStore';

export const Franchise = ({ isActive }) => {
  const { franchise, setFranchise } = useStore(franchiseStore);
  const [dataset, setDataset] = useStore(datasetStore).dataset;

  const franchiseValues = [
    { code: 'FRA-300', label: '300 CHF' },
    { code: 'FRA-500', label: '500 CHF' },
    { code: 'FRA-1000', label: '1000 CHF' },
    { code: 'FRA-1500', label: '1500 CHF' },
    { code: 'FRA-2000', label: '2000 CHF' },
    { code: 'FRA-2500', label: '2500 CHF' },
  ];

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
