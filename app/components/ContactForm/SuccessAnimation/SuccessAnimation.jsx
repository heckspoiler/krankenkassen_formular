import React, { useEffect } from 'react';
import styles from './SuccessAnimation.module.css';

export const SuccessAnimation = ({ isActive }) => {
  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  return (
    <div className={`${styles.Main} ${isActive ? styles.Visible : ''}`}>
      <div className={styles.successAnimation}>
        <svg
          className={`${styles.checkmark} ${isActive ? styles.checkmarkActive : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={`${styles.circle} ${isActive ? styles.circleActive : ''}`}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={`${styles.check} ${isActive ? styles.checkActive : ''}`}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h2 className={`${styles.Title} ${isActive ? styles.TitleVisible : ''}`}>
        Anfrage übermittelt!
      </h2>
      <p className={`${styles.para} ${isActive ? styles.TitleVisible : ''}`}>
        Sie erhalten in Kürze eine Bestätigungsmail.
      </p>
    </div>
  );
};
