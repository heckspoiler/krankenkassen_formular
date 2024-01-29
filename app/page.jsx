import { Form } from './components/form';
import DataFetching from './static/page';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.Main}>
      <Form />
      <DataFetching />
    </main>
  );
}
