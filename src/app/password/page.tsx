'use client';

import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import {usePasStore} from '@/store';

export default function Password() {
  const [length, setLength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const addPassword = usePasStore(state => state.addPassword);
  const loadPasswordsFromStorage = usePasStore(state => state.loadPasswordsFromStorage);
  const passwords = usePasStore(state => state.passwords);

  const generatePassword = (length: number) => {
    const maxLength = 36;

    if (length > maxLength) {
      setError(`Длина пароля не должна превышать ${maxLength} символов.`);
      return null; // Early return if error
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    return generatedPassword;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedLength = parseInt(length.toString(), 10);

    if (parsedLength >= 5 && parsedLength <= 36) {
      const newPassword = generatePassword(parsedLength);
      if (newPassword) {
        addPassword(newPassword);
        setError(null);
      }
    } else if (parsedLength < 5) {
      setError('Введите положительное число больше 5');
    } else {
      setError('Длина пароля не должна превышать 36 символов.');
    }
  };

  useEffect(() => {
    loadPasswordsFromStorage();
  }, [loadPasswordsFromStorage]);

  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Длина генерации пароля</label>
          <input
            type='number'
            className={styles.input_number}
            value={length}
            onChange={e => setLength(Number(e.target.value))} // Parse input as number
            min='1'
          />

          <button className={styles.submit_btn} type='submit'>
            Сгенерировать пароль
          </button>
        </form>
        {error && <span className={styles.error_message}>{error}</span>}
      </div>
      <div className={styles.list_pas}>
        {passwords.length === 0 && <span>Список паролей пока пуст</span>}

        {passwords.length > 0 && (
          <>
            <h3>Список паролей:</h3>
            <ul>
              {passwords.map(pas => (
                <li className={styles.list_item} key={pas}>
                  {pas}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
