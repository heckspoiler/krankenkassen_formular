'use client';

import React, { useEffect } from 'react';
import styles from './AddMore.module.css';
import { useStore } from 'zustand';
import { addMoreStore } from '@/utils/stores/addMoreStore';
export const AddMore = () => {
  const { addMore, setAddMore } = useStore(addMoreStore);

  const handleAddMore = (e) => {
    setAddMore(e.target.value === 'ja');
    console.log(addMore);
  };

  return (
    <main name="addmore" id="AddMoreSelect" className={styles.Main}>
      <h3>Möchten Sie noch weitere Personen zur Offerte hinzufügen?</h3>
      <button
        value="ja"
        className={`${styles.Button} ${addMore ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        Ja
      </button>
      <button
        value="nein"
        className={`${styles.Button} ${!addMore ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        Nein
      </button>
    </main>
  );
};
