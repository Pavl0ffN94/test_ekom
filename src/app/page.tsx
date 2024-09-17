'use client';

import styles from './page.module.css';
import {FormName, Header} from '@/components';
import {useNameStore} from '@/store';
import {useEffect} from 'react';

export default function Home() {
  const loadNameFromStorage = useNameStore(state => state.loadNameFromStorage);

  useEffect(() => {
    loadNameFromStorage();
  }, [loadNameFromStorage]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <FormName />
      </main>
    </div>
  );
}
