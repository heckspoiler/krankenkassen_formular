'use client';

import styles from './Form.module.css';
import Zipcode from './zipcode/Zipcode';
import { useStore } from 'zustand';

export const FormComponent = ({ data }) => {
  const dataArray = data.props.dataset;

  return (
    <div className={styles.Main}>
      <h1 className={styles.Title}>Form</h1>
      <div className={styles.ZipcodeContainer}>
        <Zipcode />
      </div>
      <ul className={styles.List}>
        {dataArray.map((data, index) => {
          return (
            <li className={styles.ListObject} key={index}>
              {data.praemie} CHF/Monat
            </li>
          );
        })}
      </ul>
    </div>
  );
};
