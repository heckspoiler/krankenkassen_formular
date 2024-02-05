'use client';

import React from 'react';
import styles from './AddMore.module.css';
import { useStore } from 'zustand';
import { addMoreStore } from '@/utils/stores/AddMoreStore';

export const AddMore = () => {
  const { addMore, setAddMore } = useStore(addMoreStore);

  return (
    <main name="addmore" id="AddMoreSelect" className={styles.Main}>
      <h3>Möchten Sie noch weitere Personen zur Offerte hinzufügen?</h3>
      <button value="ja" className={styles.Button}>
        Ja
      </button>
      <button value="nein" className={styles.Button}>
        Nein
      </button>
    </main>
  );
};
