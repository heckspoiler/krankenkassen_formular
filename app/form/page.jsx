'use client';

import { useEffect } from 'react';
import { FormComponent } from '../components/FormComponent/FormComponent';
import supabase from '../../utils/supabase';
import styles from './Form.module.css';
import { useStore } from 'zustand';
import { datasetStore } from '@/utils/stores/datasetStore';
import { ageStore } from '@/utils/stores/ageStore';
import { franchiseStore } from '@/utils/stores/franchiseStore';
import { accidentStore } from '@/utils/stores/accidentStore';
import { fetchStore } from '@/utils/stores/fetchStore';
import { plzStore } from '@/utils/stores/plzStore';
import { regionStore } from '@/utils/stores/regionStore';
import { cantonRadioStore } from '@/utils/stores/cantonRadioStore';
import { cantonStore } from '@/utils/stores/cantonStore';
import { cantons } from '../components/FormComponent/Canton/Canton';

export const users = [];
export const emailStore = [];

export default function Form() {
  const { dataset, setDataset } = useStore(datasetStore);
  const selectedAge = useStore(ageStore).age;
  const selectedFranchise = useStore(franchiseStore).franchise;
  const selectedAccident = useStore(accidentStore).accident;
  const fetch = useStore(fetchStore).fetch;
  const plz = useStore(plzStore).plz;
  const { cantonRadio, setCantonRadio } = useStore(cantonRadioStore);
  const { region, setRegion } = useStore(regionStore);
  const { canton, setCanton } = useStore(cantonStore);

  const findCantonAbbreviation = (fullName) => {
    return cantons[fullName];
  };

  const praemiendecode = function (praemienregion) {
    switch (praemienregion) {
      case '0':
        return 'PR-REG CH0';
      case '1':
        return 'PR-REG CH1';
      case '2':
        return 'PR-REG CH2';
      case '3':
        return 'PR-REG CH3';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (plz !== 0) {
      async function fetchRegion() {
        try {
          const response = await supabase
            .from('regionsfinal')
            .select('canton, plz, region')
            .eq('plz', plz);

          setRegion(response.data[0].region);
          const canton = response.data[0].canton;
          setCanton(findCantonAbbreviation(canton));
        } catch (error) {
          alert('etwas falsch gelaufen, bitte versuchen Sie es erneut.');
          console.error('Error fetching data from Supabase: ', error);
        }
      }

      fetchRegion();
    }
  }, [plz]);

  useEffect(() => {
    if (fetch) {
      async function fetchData() {
        try {
          const response = await supabase
            .from('praemien')
            .select(
              'versicherer, kanton, altersklasse, unfall, tarif, franchise, praemie, region'
            )
            .eq('kanton', canton)
            .eq('unfall', selectedAccident)
            .eq('altersklasse', selectedAge)
            .eq('franchise', selectedFranchise)
            .eq('region', praemiendecode(region));

          console.log(selectedFranchise);
          setDataset(response.data);
          console.log('Data: ', response.data);

          if (response.error) throw response.error;
          const regionCode = praemiendecode(region);
          users.push(response.data);
          emailStore.push(
            `Kanton: ${canton}`,
            `Region: ${regionCode}`,
            `PLZ: ${plz}`,
            `Alter: ${selectedAge}`,
            `Franchise: ${selectedFranchise}`,
            `Unfalldeckung: ${selectedAccident}`,
            `Kanton-Radio: ${cantonRadio}`
          );
          console.log('Email Store: ', emailStore);
        } catch (error) {
          console.error('Error fetching data from Supabase: ', error);
        }
      }
      fetchData();
    }
  }, [fetch]);

  return (
    <main className={styles.Main}>
      <FormComponent />
    </main>
  );
}
