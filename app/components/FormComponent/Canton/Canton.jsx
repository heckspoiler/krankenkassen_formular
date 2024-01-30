'use client';

import React from 'react';
import styles from './Canton.module.css';
import { useStore } from 'zustand';
import { cantonStore } from '../../../../utils/stores/cantonStore';

export const Canton = () => {
  const setSelectedCanton = useStore(cantonStore).setCanton;

  const handleCantonClick = (e) => {
    setSelectedCanton(e.target.value);
    console.log(e.target.value, cantonStore.getState());
  };

  return (
    <div name="canton" id="cantonSelect" className={styles.Main}>
      <button onClick={handleCantonClick} value="AG" className={styles.button}>
        AG
      </button>
      <button onClick={handleCantonClick} value="AI" className={styles.button}>
        AI
      </button>
      <button onClick={handleCantonClick} value="AR" className={styles.button}>
        AR
      </button>
      <button onClick={handleCantonClick} value="BE" className={styles.button}>
        BE
      </button>
      <button onClick={handleCantonClick} value="BL" className={styles.button}>
        BL
      </button>
      <button onClick={handleCantonClick} value="BS" className={styles.button}>
        BS
      </button>
      <button onClick={handleCantonClick} value="FR" className={styles.button}>
        FR
      </button>
      <button onClick={handleCantonClick} value="GE" className={styles.button}>
        GE
      </button>
      <button onClick={handleCantonClick} value="GL" className={styles.button}>
        GL
      </button>
      <button onClick={handleCantonClick} value="GR" className={styles.button}>
        GR
      </button>
      <button onClick={handleCantonClick} value="JU" className={styles.button}>
        JU
      </button>
      <button onClick={handleCantonClick} value="LU" className={styles.button}>
        LU
      </button>
      <button onClick={handleCantonClick} value="NE" className={styles.button}>
        NE
      </button>
      <button onClick={handleCantonClick} value="NW" className={styles.button}>
        NW
      </button>
      <button onClick={handleCantonClick} value="OW" className={styles.button}>
        OW
      </button>
      <button onClick={handleCantonClick} value="SG" className={styles.button}>
        SG
      </button>
      <button onClick={handleCantonClick} value="SH" className={styles.button}>
        SH
      </button>
      <button onClick={handleCantonClick} value="SO" className={styles.button}>
        SO
      </button>
      <button onClick={handleCantonClick} value="SZ" className={styles.button}>
        SZ
      </button>
      <button onClick={handleCantonClick} value="TG" className={styles.button}>
        TG
      </button>
      <button onClick={handleCantonClick} value="TI" className={styles.button}>
        TI
      </button>
      <button onClick={handleCantonClick} value="UR" className={styles.button}>
        UR
      </button>
      <button onClick={handleCantonClick} value="VD" className={styles.button}>
        VD
      </button>
      <button onClick={handleCantonClick} value="VS" className={styles.button}>
        VS
      </button>
      <button onClick={handleCantonClick} value="ZG" className={styles.button}>
        ZG
      </button>
      <button onClick={handleCantonClick} value="ZH" className={styles.button}>
        ZH
      </button>
    </div>
  );
};
