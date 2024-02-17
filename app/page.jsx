'use client';

import { useEffect, useState } from 'react';
import Form from './form/page';
import styles from './Home.module.css';
import ContactForm from './components/ContactForm/ContactForm';

export default function Home() {
  return (
    <section className={styles.Main}>
      <Form />
      <ContactForm />
    </section>
  );
}
