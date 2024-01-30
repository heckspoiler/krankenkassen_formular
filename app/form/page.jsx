'use client';

import { useEffect } from 'react';
import { FormComponent } from '../components/FormComponent/FormComponent';
import supabase from '../../utils/supabase';
import styles from './Form.module.css';
import { useStore } from 'zustand';
import { cantonStore } from '@/utils/stores/cantonStore';
import { datasetStore } from '@/utils/stores/datasetStore';

export default function Form() {
  const selectedCanton = useStore(cantonStore);
  const canton = selectedCanton.canton;
  const dataset = useStore(datasetStore);
  const setDataset = useStore(datasetStore).setDataset;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await supabase
          .from('praemien')
          .select(
            'versicherer, kanton, region, altersklasse, unfall, tarif, franchisestufe, franchise'
          )
          .eq('kanton', canton);

        if (response.error) throw response.error;

        setDataset(response.data);
        console.log(canton);
        console.log('Data fetched from Supabase: ', response.data);
      } catch (error) {
        console.error('Error fetching data from Supabase: ', error);
      }
    }

    fetchData();
  }, [canton, setDataset]);

  return (
    <main className={styles.Main}>
      <FormComponent />
    </main>
  );
}
