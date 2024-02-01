'use client';
import { useState, useEffect } from 'react';
import styles from './FormComponent.module.css';
import { Canton } from './Canton/Canton';
import { Age } from './AgeComponent/Age';
import { Franchise } from './FranchiseComponent/Franchise';
import { Accident } from './accidentComponent/Accident';
import { useStore } from 'zustand';
import { fetchStore } from '@/utils/stores/fetchStore';

export const FormComponent = () => {
  const [isActive, setIsActive] = useState(0);
  const [title, setTitle] = useState('Wohnkanton');
  const [buttonText, setButtonText] = useState('Weiter');
  const setFetch = useStore(fetchStore).setFetch;
  const fetch = useStore(fetchStore).fetch;

  const handleNext = () => {
    setIsActive((current) => (current < 3 ? current + 1 : current));
    isActive === 3 ? setFetch(true) : setFetch(false);
    console.log(fetch);
    console.log(isActive);
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

  useEffect(() => {
    if (isActive === 3) {
      setButtonText('Auswerten');
    } else {
      setButtonText('Weiter');
    }
  }, [isActive]);

  return (
    <div className={styles.Main}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Multistep}>
        <div className={styles.MultistepSlider}>
          <Canton isActive={isActive} />
          <Age isActive={isActive} />
          <Franchise isActive={isActive} />
          <Accident isActive={isActive} />
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

        <button
          onClick={handleNext}
          className={styles.AdvanceButton}
          id="advancebutton"
        >
          {buttonText}
        </button>
      </div>
      <div className={styles.IndicatorContainer}>
        <div className={styles.Indicator}></div>
        <div className={styles.Indicator}></div>
        <div className={styles.Indicator}></div>
        <div className={styles.Indicator}></div>
      </div>
    </div>
  );
};
