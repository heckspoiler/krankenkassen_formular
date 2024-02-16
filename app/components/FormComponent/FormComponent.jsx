'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './FormComponent.module.css';
import { Region } from './regionComponent/Region';
import { Age } from './AgeComponent/Age';
import { Franchise } from './FranchiseComponent/Franchise';
import { Accident } from './accidentComponent/Accident';
import { OfferList } from '../OfferList/OfferList';
import { AddMore } from './addMoreComponent/AddMore';
import { useStore } from 'zustand';
import { fetchStore } from '@/utils/stores/fetchStore';

export const FormComponent = () => {
  const [isActive, setIsActive] = useState(0);
  const [title, setTitle] = useState('Wohnsituation');
  const [buttonText, setButtonText] = useState('Weiter');
  const { fetch, setFetch } = useStore(fetchStore);

  const topOfForm = useRef(null);

  const handleNext = () => {
    setIsActive((current) => (current < 5 ? current + 1 : current));
    isActive === 4 ? setFetch(true) : setFetch(false);
    console.log(fetch);
  };

  const handleBack = () => {
    setIsActive((current) => (current > 0 ? current - 1 : current));
    setFetch(false);
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
    const syncUrlWithState = () => {
      const stepTitles = [
        'Wohnsituation',
        'Alterskategorie',
        'Franchisehöhe',
        'Unfallversicherung',
        'Weitere Offerten',
        'Angebote',
      ];

      if (isActive >= 0 && isActive < stepTitles.length) {
        slider.style.transform = `translateX(-${30 * isActive}vw)`;
        setTitle(stepTitles[isActive]);
      }
    };

    syncUrlWithState();
  }, [isActive]);

  useEffect(() => {
    if (isActive === 4) {
      setButtonText('Auswerten');
    } else {
      setButtonText('Weiter');
    }
  }, [isActive]);

  return (
    <div className={styles.Main} ref={topOfForm}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Multistep}>
        <div className={styles.MultistepSlider}>
          <Region />
          <Age />
          <Franchise />
          <Accident />
          <AddMore />
          <div className={styles.OffersContainer}>
            <OfferList isActive={isActive} />
          </div>
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
          className={`${styles.AdvanceButton} ${isActive === 5 ? styles.Disabled : ''}`}
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
        <div className={styles.Indicator}></div>
        <div className={styles.Indicator}></div>
      </div>
    </div>
  );
};
