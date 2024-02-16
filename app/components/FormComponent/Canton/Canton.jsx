'use client';

import React from 'react';
import styles from './Canton.module.css';
import { useStore } from 'zustand';
import { cantonStore } from '../../../../utils/stores/cantonStore';
import { CantonRadio } from './CantonRadio/CantonRadio';

export const cantons = {
  Aargau: 'AG',
  'Appenzell Innerrhoden': 'AI',
  'Appenzell Ausserrhoden': 'AR',
  Bern: 'BE',
  'Basel-Landschaft': 'BL',
  'Basel-Stadt': 'BS',
  Freiburg: 'FR',
  Genf: 'GE',
  Glarus: 'GL',
  Graubünden: 'GR',
  Jura: 'JU',
  Luzern: 'LU',
  Neuenburg: 'NE',
  Nidwalden: 'NW',
  Obwalden: 'OW',
  'St. Gallen': 'SG',
  Schaffhausen: 'SH',
  Solothurn: 'SO',
  Schwyz: 'SZ',
  Thurgau: 'TG',
  Tessin: 'TI',
  Uri: 'UR',
  Waadt: 'VD',
  Wallis: 'VS',
  Zug: 'ZG',
  Zürich: 'ZH',
};

export const Canton = ({ isActive }) => {
  const { canton, setCanton } = useStore(cantonStore);

  const handleCantonClick = (e) => {
    setCanton(e.target.value);
  };

  return (
    <div name="canton" id="cantonSelect" className={styles.Main}>
      <div className={styles.cantonContainer}>
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
      <CantonRadio isActive={isActive} />
    </div>
  );
};
