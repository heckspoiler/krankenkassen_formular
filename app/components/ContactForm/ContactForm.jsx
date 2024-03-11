'use client';

import styles from './ContactForm.module.css';
import { useState } from 'react';
import { useStore, getState } from 'zustand';
import { formStore } from '@/utils/stores/formStore';
import { contactFormStore } from '@/utils/stores/contactStore';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { offerStore } from '@/utils/stores/offerStore';
import { SuccessAnimation } from './SuccessAnimation/SuccessAnimation';
import { addMoreStore } from '@/utils/stores/addMoreStore';
import { plzStore } from '@/utils/stores/plzStore';

const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});

export const formInformation = [];

export default function ContactForm() {
  const { showForm, setShowForm } = useStore(contactFormStore);
  const { versicherung, praemie, tarif } = useStore(offerStore);
  const [isActive, setIsActive] = useState(false);
  const { addMore, setAddMore } = useStore(addMoreStore);
  const plz = useStore(plzStore).plz;


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

  const hideFormClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addMore);
    if (surname === '' || firstname === '' || email === '' || phone === '') {
      alert('Füllen Sie bitte alle Felder aus. ');
    } else {
      setIsActive(true);
      await sendCustomer();
      await sendUs();
    }
  };

  const sendUs = async () => {
    const formData = {
      to: email,
      subject: `Anfrage erhalten von ${firstname} ${surname}`,
      html: `
      <p><strong>Von:</strong> ${surname} ${firstname},</p>
      <p><strong>Geburtsdatum:</strong> ${birthday}</p>
      <p><strong>Mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p> 
      <p><strong>Nachricht:</strong> ${text}</p>
      <p><strong>Versicherer:</strong> ${versicherung}</p>
      <p><strong>Tarif:</strong> ${tarif}</p>
      <p><strong>Prämie:</strong> ${praemie}</p>
      <p><strong>Postleitzahl:</strong> ${plz}</p>
      <p><strong>Zusätzliche Personen:</strong> ${addMore === '0' ? 'nein' : addMore}</p>
     `,
    };
    try {
      const response = await fetch('/api/ourMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  const sendCustomer = async () => {
    const formData = {
      to: email,
      subject: `${firstname}, deine persönliche Offerte kommt bald.`,
      html: `<table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; font-family: 'Helvetica', sans-serif; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
      <tr>
        <td style="background-color: white; padding: 20px; text-align: center;">
          <img src="https://krankenkassen-kompass.ch/wp-content/uploads/2024/02/logo-kk-1536x488.png" alt="Logo Krankenkassenkompass" style="max-width: 200px; border-radius: 5px;">
          <h2 style="color: rgba(113, 0, 38, 1); font-size: 24px; margin-top: 20px;">Deine persönliche Offerte</h2>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ffffff; padding: 20px; color: #333; font-size: 16px;">
          <p>Hallo ${firstname},</p>
          <p>vielen Dank für dein Interesse an unseren Dienstleistungen. Wir freuen uns, dir bei der Suche nach der optimalen Krankenversicherung behilflich zu sein.</p>
          <p>Wir haben deine Anfrage erhalten und werden uns so schnell wie möglich bei dir melden, um deine individuellen Bedürfnisse und Anforderungen zu besprechen.</p>
          <p>In der Zwischenzeit kannst du gerne unsere Website für weitere Informationen besuchen oder direkt Kontakt mit uns aufnehmen.</p>
          <p>Wir danken dir für dein Vertrauen und freuen uns darauf, dich persönlich zu beraten.</p>
          <br/>
          <h3>Hier kannst du eine Übersicht deiner Auswahl sehen: </h3>
          <div style="background-color: rgba(238, 237, 233, 1); padding: 20px; color: #333; font-size: 16px;">
          <p><strong>Postleitzahl:</strong> ${plz}</p>
          <p><strong>Krankenkasse:</strong> ${versicherung}</p>
          <p><strong>Tarif:</strong> ${tarif}</p>
          <p><strong>Prämie:</strong> ${praemie} CHF</p>
          <p><strong>Zusätzliche Personen:</strong> ${addMore === '0' ? 'nein' : addMore && addMore === '3+' ? '3 oder mehr' : addMore}</p>
          </div>
          <p>Liebe Grüsse,</p>
          <p style="font-weight: bold;">Dein Krankenkassenkompass Team</p>
        
        </td>
      </tr>
      <tr>
        <td style="background-color: rgba(113, 0, 38, 1); padding: 20px; text-align: center;">
          <p style="color: #ffffff; font-size: 14px; margin-top: 20px;">Folge uns auf <a href="#" style="color: #fff; text-decoration: underline;">Social Media</a></p>
        </td>
      </tr>
    </table>
    `,
    };

    try {
      const response = await fetch('/api/customerMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  return (
    <section className={`${styles.Main} ${showForm ? styles.FormVisible : ''}`}>
      <div className={styles.CrossContainer} onClick={hideFormClick}>
        <div className={styles.Cross}>
          <div></div>
          <div></div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.Title}>Unverbindliche Offerte</h2>
        <p>
          Wir werden dein Anliegen vertraulich behandeln und die gewünschte
          Krankenkasse über dein Interesse an einer unverbindlichen Offerte
          informieren.
        </p>
        <div className={styles.FormGroup}>
          <label htmlFor="firstnameeeeeee">
            Vorname<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>

        <div className={styles.FormGroup}>
          <label htmlFor="surname">
            Nachname<span className={styles.required}>*</span>
          </label>

          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div className={styles.FormGroup}>
          <label htmlFor="birthday">
            Geburtsdatum<span className={styles.required}>*</span>
          </label>

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
          <label htmlFor="email">
            E-Mail<span className={styles.required}>*</span>
          </label>
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
          <label htmlFor="phoneinput">
            Telefon<span className={styles.required}>*</span>
          </label>
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
        <button type="submit" className={styles.Button} onClick={handleSubmit}>
          Offerte einholen
        </button>
        <SuccessAnimation isActive={isActive} />
      </form>
    </section>
  );
}
