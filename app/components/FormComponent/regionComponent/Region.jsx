'use client';

import React, { useState } from 'react';
import styles from './Region.module.css';
import { useStore } from 'zustand';
import { plzStore } from '@/utils/stores/plzStore';
import { regionStore } from '@/utils/stores/regionStore';
import { CantonRadio } from '../Canton/CantonRadio/CantonRadio';
import { CurrentlyLiving } from '../Canton/currentlyLiving/CurrentlyLiving';

export const Region = () => {
  const { plz, setPLZ } = useStore(plzStore);
  const [inputValue, setInputValue] = useState('');
  const { region, setRegion } = useStore(regionStore);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== '') {
      setPLZ(Number(inputValue));
    }
  };

  return (
    <div className={styles.Main}>
      <CurrentlyLiving />
      <CantonRadio />
      <div className={styles.PLZContainer}>
        <p>Bitte geben Sie Ihre Postleitzahl ein</p>
        <input
          type="text"
          id="plz"
          name="plz"
          placeholder="PLZ"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};
