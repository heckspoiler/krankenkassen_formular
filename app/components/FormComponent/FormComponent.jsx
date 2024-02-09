'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './FormComponent.module.css';
import { Canton } from './Canton/Canton';
import { Age } from './AgeComponent/Age';
import { Franchise } from './FranchiseComponent/Franchise';
import { Accident } from './accidentComponent/Accident';
import { OfferList } from '../OfferList/OfferList';
import { AddMore } from './addMoreComponent/AddMore';
import { useStore } from 'zustand';
import { fetchStore } from '@/utils/stores/fetchStore';
import { addMoreStore } from '@/utils/stores/addMoreStore';

export const FormComponent = () => {
  const [isActive, setIsActive] = useState(0);
  const [title, setTitle] = useState('Wohnkanton');
  const [buttonText, setButtonText] = useState('Weiter');
  const setFetch = useStore(fetchStore).setFetch;
  const topOfForm = useRef(null);
  const { addMore, setAddMore } = useStore(addMoreStore);

  // useEffect(() => {
  //   console.log('addMore: ', addMore);
  // }, [addMore]);

  const handleNext = () => {
    setIsActive((current) => (current < 5 ? current + 1 : current));
    isActive === 4 ? setFetch(true) : setFetch(false);
    if (isActive === 4 && addMore) {
      setIsActive(0);
      setFetch(true);
    } else {
      setAddMore(false);
    }
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
        'Wohnkanton',
        'Alterskategorie',
        'Franchisehöhe',
        'Unfallversicherung',
        'Weitere Offerten',
        'Angebote',
      ];

      if (isActive >= 0 && isActive < stepTitles.length) {
        console.log(addMore, isActive);
        slider.style.transform = `translateX(-${30 * isActive}vw)`;
        setTitle(stepTitles[isActive]);
      }
    };

    syncUrlWithState();
  }, [isActive]);

  useEffect(() => {
    if (isActive === 4) {
      if (addMore) {
        setButtonText('Hinzufügen');
      } else {
        setButtonText('Auswerten');
      }
    } else {
      setButtonText('Weiter');
    }
  }, [isActive, addMore]);

  return (
    <div className={styles.Main} ref={topOfForm}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Multistep}>
        <div className={styles.MultistepSlider}>
          <Canton />
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
