'use client';

import React from 'react';
import styles from './Canton.module.css';
import { useStore } from 'zustand';
import { cantonStore } from '../../../../utils/stores/cantonStore';

export const Canton = () => {
  const { canton, setCanton } = useStore(cantonStore);

  const handleCantonClick = (e) => {
    setCanton(e.target.value);
  };

  const cantons = [
    'AG',
    'AI',
    'AR',
    'BE',
    'BL',
    'BS',
    'FR',
    'GE',
    'GL',
    'GR',
    'JU',
    'LU',
    'NE',
    'NW',
    'OW',
    'SG',
    'SH',
    'SO',
    'SZ',
    'TG',
    'TI',
    'UR',
    'VD',
    'VS',
    'ZG',
    'ZH',
  ];

  return (
    <div name="canton" id="cantonSelect" className={styles.Main}>
      {cantons.map((cantonCode) => (
        <button
          key={cantonCode}
          onClick={handleCantonClick}
          value={cantonCode}
          className={`${styles.Button} ${canton === cantonCode ? styles.Active : ''}`}
        >
          {cantonCode}
        </button>
      ))}
    </div>
  );
};
