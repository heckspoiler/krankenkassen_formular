'use client';

import React from 'react';
import styles from './Region.module.css';
import { useStore } from 'zustand';
import { regionStore } from '../../../../utils/stores/regionStore';

export const Region = () => {
  const { region, setRegion } = useStore(regionStore);

  const handleregionClick = (e) => {
    setRegion(e.target.value);
  };

  const regions = ['PR-REG CH0', 'PR-REG CH1', 'PR-REG CH2', 'PR-REG CH3'];

  return (
    <div name="region" id="regionSelect" className={styles.Main}>
      <p>Bitte geben Sie Ihre Postleitzahl ein</p>
      <input type="text" id="plz" name="plz" placeholder="PLZ"></input>
    </div>
  );
};
