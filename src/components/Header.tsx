import {useNameStore} from '@/store';
import styles from './styles.module.css';

export const Header = () => {
  const name = useNameStore(state => state.name);

  return <header className={styles.header}>{name && <h1>Привет, {name}!</h1>}</header>;
};
