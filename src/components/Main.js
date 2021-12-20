import styles from './Main.module.css';
import { useSelector } from 'react-redux';

const Main = () => {
  const isAuth = useSelector(state => state.isAuth);
  return (
    <main className={styles.main}>
      {isAuth && <h1>Welcome back</h1>}
      {!isAuth && <h1>Music for everyone.</h1>}
      {!isAuth && <h3>Millions of songs. No credit card needed.</h3>}
    </main>
  );
};
export default Main;
