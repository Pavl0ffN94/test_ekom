'use client';

import {FormEvent, useState} from 'react';

import styles from './styles.module.css';
import {useNameStore} from '@/store';

export const FormName = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const setName = useNameStore(state => state.setName);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label_form}>Напишите ваше имя</label>
        <input
          className={styles.input_name}
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Ваше имя'
        />
        <button className={styles.btn} type='submit'>
          Сохранить
        </button>
      </form>
    </div>
  );
};
