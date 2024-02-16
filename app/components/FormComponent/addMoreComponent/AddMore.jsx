import React from 'react';
import styles from './AddMore.module.css';
import { useStore } from 'zustand';
import { addMoreStore } from '@/utils/stores/addMoreStore';

export const AddMore = () => {
  const { addMore, setAddMore } = useStore(addMoreStore);

  const handleAddMore = (e) => {
    setAddMore(e.target.value);
    console.log(addMore);
  };

  return (
    <main name="addmore" id="AddMoreSelect" className={styles.Main}>
      <h3>Möchten Sie noch weitere Personen zur Offerte hinzufügen?</h3>
      <button
        value="0"
        className={`${styles.Button} ${addMore === '0' ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        Nein
      </button>
      <button
        value="1"
        className={`${styles.Button} ${addMore === '1' ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        1
      </button>
      <button
        value="2"
        className={`${styles.Button} ${addMore === '2' ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        2
      </button>
      <button
        value="3"
        className={`${styles.Button} ${addMore === '3' ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        3
      </button>
      <button
        value="3+"
        className={`${styles.Button} ${addMore === '3+' ? styles.Active : ''}`}
        onClick={handleAddMore}
      >
        3+
      </button>
    </main>
  );
};
