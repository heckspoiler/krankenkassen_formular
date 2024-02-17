'use client';
import { useState, useEffect } from 'react';
import styles from './ContactForm.module.css';
import { useStore, getState } from 'zustand';
import { formStore } from '@/utils/stores/formStore';
import PhoneInput from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';

export const formInformation = [];

export default function ContactForm() {
  const [showForm, setShowForm] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();

    const formData = {
      surname,
      firstname,
      email,
      birthday: birthday ? birthday.toISOString() : '',
      phone,
      text,
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const {
    surname,
    setSurname,
    firstname,
    setFirstname,
    email,
    setEmail,
    birthday,
    setBirthday,
    phone,
    setPhone,
    text,
    setText,
  } = useStore(formStore);

  const showFormClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formInformation.push({
      surname,
      firstname,
      email,
      birthday,
      phone,
      text,
    });
  };

  return (
    <main className={`${styles.Main} ${showForm ? styles.FormVisible : ''}`}>
      <div className={styles.CrossContainer} onClick={showFormClick}>
        <div className={styles.Cross}>
          <div></div>
          <div></div>
        </div>
      </div>
      <form onSubmit={sendMail}>
        <h2 className={styles.Title}>Erhalten Sie Ihre Offerte</h2>
        <p>
          Wir werden Ihre Anliegen vertraulich behandeln und die gewünschte
          Krankenkasse über Ihr Interesse an einer unverbindlichen Offerte
          informieren.
        </p>
        <div className={styles.FormGroup}>
          <label htmlFor="surname">Nachname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="firstname">Vorname</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="birthday">Geburtsdatum</label>

          <DatePicker
            className={styles.DatePicker}
            selected={birthday}
            onChange={(date) => setBirthday(date)}
            dateFormat="dd.MM.yyyy"
            placeholderText="TT.MM.JJJJ"
            enableTabLoop={false}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            maxDate={new Date()}
            required
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="phone">Telefon</label>
          <div className={styles.PhoneInputContainer}>
            <PhoneInput
              className={styles.PhoneInput}
              defaultCountry="CH"
              value={phone}
              onChange={setPhone}
              placeholder="Telefonnummer inkl. Vorwahl"
            />
          </div>
        </div>
        <div className={styles.FormGroup}>
          <label htmlFor="message">Nachricht</label>
          <textarea
            id="message"
            name="message"
            placeholder=" (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.Button}>
          Offerte einholen
        </button>
      </form>
    </main>
  );
}
