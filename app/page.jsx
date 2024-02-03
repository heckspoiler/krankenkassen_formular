import Form from './form/page';
import styles from './Home.module.css';
import { OfferList } from './components/OfferList/OfferList';

export default function Home() {
  return (
    <main className={styles.Main}>
      <Form />
      <OfferList />
    </main>
  );
}
