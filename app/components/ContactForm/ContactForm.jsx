'use client';
import { useState } from 'react';
import styles from './ContactForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { contactFormStore } from '@/utils/stores/contactStore';

export default function ContactForm() {
  const [date, setDate] = useState(new Date());
  const [birthday, setBirthday] = useState(null);
  const { showForm, setShowForm } = contactFormStore();

  const showFormClick = () => {
    !showForm ? setShowForm(true) : setShowForm(false);
  };

  return (
    <main className={`${styles.Main} ${showForm ? styles.FormVisible : ''}`}>
      <div className={styles.CrossContainer} onClick={showFormClick}>
        <div className={styles.Cross}>
          <div></div>
          <div></div>
        </div>
      </div>
      <form>
        <h2 className={styles.Title}>Erhalten Sie Ihre Offerte</h2>
        <p>
          Wir werden Ihre Anliegen vertraulich behandeln und die gewünschte
          Krankenkasse über Ihr Interesse an einer unverbindlichen Offerte
          informieren.
        </p>
        <div className={styles.FormGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="vorname">Vorname</label>
          <input type="text" id="vorname" name="vorname" required />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="birthday">Geburtsdatum</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={(e) => setBirthday(new Date(e.target.value))}
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="message">Nachricht</label>
          <textarea id="message" name="message" placeholder=" (optional)" />
        </div>
        <button type="submit" className={styles.Button}>
          Senden
        </button>
      </form>
    </main>
  );
}
