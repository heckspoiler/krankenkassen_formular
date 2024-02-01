'use client';
import { useState, useEffect } from 'react';
import styles from './FormComponent.module.css';
import { Canton } from './Canton/Canton';
import { useStore } from 'zustand';
import { cantonStore } from '@/utils/stores/cantonStore';

export const FormComponent = () => {
  const selectedCanton = useStore(cantonStore).canton;
  const [isActive, setIsActive] = useState(0);

  const handleNext = () => {
    setIsActive((current) => (current < 3 ? current + 1 : current));
  };

  const handleBack = () => {
    setIsActive((current) => (current > 0 ? current - 1 : current));
  };

  useEffect(() => {
    const indicators = document.querySelectorAll(`.${styles.Indicator}`);
    indicators.forEach((indicator, index) => {
      if (index === isActive) {
        indicator.classList.add(styles.Active);
      } else {
        indicator.classList.remove(styles.Active);
      }
    });
  }, [isActive]);

  return (
    <div className={styles.Main}>
      <div className={styles.Multistep}>
        <Canton isActive={isActive} />
      </div>
      <div className={styles.LowerContainer}>
        <button
          onClick={handleBack}
          className={`${styles.AdvanceButton} ${isActive === 0 ? styles.Disabled : ''}`}
          id="backbutton"
        >
          Zurück
        </button>
        <div className={styles.IndicatorContainer}>
          <div className={styles.Indicator}></div>
          <div className={styles.Indicator}></div>
          <div className={styles.Indicator}></div>
          <div className={styles.Indicator}></div>
        </div>
        <button
          onClick={handleNext}
          className={styles.AdvanceButton}
          id="advancebutton"
        >
          Weiter
        </button>
      </div>
    </div>
  );
};
