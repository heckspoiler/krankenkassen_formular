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
import { currentlyLivingStore } from '@/utils/stores/currentlyLivingStore';
import { cantonStore } from '@/utils/stores/cantonStore';
import { cantons } from '../components/FormComponent/Canton/Canton';
import { weiterStore } from '@/utils/stores/weiterStore';

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
  const { currentlyLiving, setCurrentlyLiving } =
    useStore(currentlyLivingStore);
  const { weiter, setWeiter } = useStore(weiterStore);

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
          setWeiter(true);
        } catch (error) {
          if (plz.length !== 4) {
            alert(
              'Bitte gib eine gültige PLZ ein. Wohlmöglich muss du die Hauptpostleitzahl deiner Gemeinde eingeben oder etwas spezifischer sein. Beispielsweise reicht 8000 nicht, um in Zürich die Region ausfindig zu machen. Analog sollte in Chur anstelle von 7002 lediglich den Wert 7000 eintragen werden, da gewisse Gemeinden nur eine Prämienregion haben. Falls diese Massnahmen nicht zum Erfolg führen, raten wir an, einen anderen Browser zu nutzen. '
            );
            setWeiter(false);
          } else {
            alert('Etwas ist falsch gelaufen, bitte versuchen es erneut.');
            console.error('Error fetching data from Supabase: ', error);
          }
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
              'versicherer, kanton, altersklasse, unfall, tarif, franchisestufe, praemie, region'
            )
            .eq('kanton', canton)
            .eq('unfall', selectedAccident)
            .eq('altersklasse', selectedAge)
            .eq('franchisestufe', selectedFranchise)
            .eq('region', praemiendecode(region));

          setDataset(response.data);

          if (response.error) throw response.error;
          const regionCode = praemiendecode(region);
          users.push(response.data);
          emailStore.push(
            currentlyLiving,
            cantonRadio,
            canton,
            regionCode,
            plz,
            selectedAge,
            selectedFranchise,
            selectedAccident,
            cantonRadio
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
    <section className={styles.Main}>
      <FormComponent />
    </section>
  );
}
