'use client';

import { useEffect } from 'react';
import { FormComponent } from '../components/FormComponent/FormComponent';
import supabase from '../../utils/supabase';
import styles from './Form.module.css';
import { useStore } from 'zustand';
import { cantonStore } from '@/utils/stores/cantonStore';
import { datasetStore } from '@/utils/stores/datasetStore';
import { ageStore } from '@/utils/stores/ageStore';
import { franchiseStore } from '@/utils/stores/franchiseStore';
import { accidentStore } from '@/utils/stores/accidentStore';
import { fetchStore } from '@/utils/stores/fetchStore';
import { plzStore } from '@/utils/stores/plzStore';

export const users = [];

export default function Form() {
  const selectedCanton = useStore(cantonStore);
  const canton = selectedCanton.canton;
  const dataset = useStore(datasetStore);
  const setDataset = useStore(datasetStore).setDataset;
  const selectedAge = useStore(ageStore).age;
  const selectedFranchise = useStore(franchiseStore).franchise;
  const selectedAccident = useStore(accidentStore).accident;
  const isFetching = useStore(fetchStore).fetch;
  const plz = useStore(plzStore).plz;

  useEffect(() => {
    if (plz !== 0) {
      async function fetchRegion() {
        try {
          const response = await supabase
            .from('regions')
            .select('plz, praemienregion')
            .eq('plz', plz);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data from Supabase: ', error);
        }
      }

      fetchRegion();
    }
  }, [plz]);

  useEffect(() => {
    if (isFetching) {
      async function fetchData() {
        try {
          const response = await supabase
            .from('praemien')
            .select(
              'versicherer, kanton, region, altersklasse, unfall, tarif, franchisestufe, franchise, praemie'
            )
            .eq('region', region)
            .eq('kanton', canton)
            .eq('altersklasse', selectedAge)
            .eq('franchise', selectedFranchise)
            .eq('unfall', selectedAccident);

          if (response.error) throw response.error;

          setDataset(response.data);
          users.push(response.data);
        } catch (error) {
          console.error('Error fetching data from Supabase: ', error);
        }
      }

      fetchData();
    }
  }, [isFetching]);

  return (
    <main className={styles.Main}>
      <FormComponent />
    </main>
  );
}
