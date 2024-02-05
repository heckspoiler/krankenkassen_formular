import Form from './form/page';
import styles from './Home.module.css';
import ContactForm from './components/ContactForm/ContactForm';

export default function Home() {
  return (
    <main className={styles.Main}>
      <Form />
      <ContactForm />
    </main>
  );
}
