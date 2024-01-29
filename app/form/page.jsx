import { FormComponent } from '../components/FormComponent/FormComponent';
import supabase from '../../utils/supabase';
import styles from './Form.module.css';

async function getData() {
  try {
    const { data, error } = await supabase
      .from('praemien')
      .select(
        'versicherer, kanton, geschaeftsjahr, region, altersklasse, praemie, unfall, tarif, franchise'
      );

    if (error) throw error;

    return {
      props: {
        dataset: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data from Supabase: ', error);

    return {
      props: {
        dataset: [],
      },
    };
  }
}

export default async function Form({ dataset }) {
  const data = await getData(dataset);
  return (
    <main className={styles.Main}>
      <FormComponent data={data} />
    </main>
  );
}
