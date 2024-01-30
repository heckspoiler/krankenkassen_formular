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
  const dataset = useStore(datasetStore);

  useEffect(() => {
    async function fetchData() {
      try {
        const { dataset, error } = await supabase.from('praemien').select();

        if (error) throw error;
      } catch (error) {
        console.error('Error fetching data from Supabase: ', error);
      }
    }

    if (selectedCanton !== '') {
      fetchData();
    }
  }, [selectedCanton]);

  return (
    <main className={styles.Main}>
      <FormComponent />
    </main>
  );
}
