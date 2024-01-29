import React from 'react';
import styles from './Form.module.css';

export const FormComponent = ({ data }) => {
  console.log('data: ', data.props);

  const dataArray = data.props.dataset;
  return (
    <div className={styles.Main}>
      <h1 className={styles.Title}>Form</h1>
      <ul className={styles.List}>
        {dataArray.map((data, index) => {
          return (
            <li className={styles.ListObject} key={index}>
              {data.praemie}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
