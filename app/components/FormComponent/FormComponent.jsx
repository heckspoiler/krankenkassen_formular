'use client';

import styles from './FormComponent.module.css';
import { Canton } from './Canton/Canton';
import { cantonStore } from '@/utils/stores/cantonStore';
import { useStore } from 'zustand';

export const FormComponent = () => {
  const selectedCanton = useStore(cantonStore).canton;

  return (
    <div className={styles.Main}>
      <h1 className={styles.Title}>Form</h1>
      <Canton />
    </div>
  );
};
