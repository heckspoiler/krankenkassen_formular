'use client';
import { useState, useEffect } from 'react';
import styles from './FormComponent.module.css';
import { Canton } from './Canton/Canton';
import { Age } from './AgeComponent/Age';
import { Franchise } from './FranchiseComponent/Franchise';
import { useStore } from 'zustand';
import { cantonStore } from '@/utils/stores/cantonStore';

export const FormComponent = () => {
  const selectedCanton = useStore(cantonStore).canton;
  const [isActive, setIsActive] = useState(0);
  const [title, setTitle] = useState('Wohnkanton');

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

  useEffect(() => {
    const slider = document.querySelector(`.${styles.MultistepSlider}`);

    if (isActive === 0) {
      slider.style.transform = 'translateX(0)';
      setTitle('Wohnkanton');
    } else if (isActive === 1) {
      slider.style.transform = 'translateX(-30vw)';
      setTitle('Alterskategorie');
    } else if (isActive === 2) {
      slider.style.transform = 'translateX(-60vw)';
      setTitle('Franchisehöhe');
    } else if (isActive === 3) {
      slider.style.transform = 'translateX(-90vw)';
      setTitle('Unfallversicherung');
    }
  });

  return (
    <div className={styles.Main}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Multistep}>
        <div className={styles.MultistepSlider}>
          <Canton isActive={isActive} />
          <Age isActive={isActive} />
          <Franchise isActive={isActive} />
        </div>
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
