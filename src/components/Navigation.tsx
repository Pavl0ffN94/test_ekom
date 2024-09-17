import Link from 'next/link';
import styles from './styles.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link href='/'>Главная</Link>
        </li>
        <li>
          <Link href='/password'>Генерация пароля</Link>
        </li>
        <li>
          <Link href='/calculator'>Калькулятор</Link>
        </li>
      </ul>
    </nav>
  );
};
