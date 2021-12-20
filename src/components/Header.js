import styles from './Header.module.css';
import Modal from '../components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../components/store/index';
const Header = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuth);
  const isModal = useSelector(state => state.isModal);

  const showModalHandler = () => {
    dispatch(authActions.showModal());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h2>Turbo</h2>
        <h4>follow the rhythm...</h4>
      </div>
      <nav>
        {!isAuth && (
          <ul className={styles.items}>
            <li className={styles.item}>Premium</li>
            <li className={styles.item}>Help</li>
            <li
              onClick={showModalHandler}
              className={`${styles.item} ${styles.logging}`}
            >
              Log in
            </li>
          </ul>
        )}
        {isAuth && (
          <ul className={styles.items}>
            <li className={styles.item}>Home</li>
            <li className={styles.item}>My account</li>
            <li
              onClick={logoutHandler}
              className={`${styles.item} ${styles.logging}`}
            >
              Log out
            </li>
          </ul>
        )}
      </nav>
      {isModal && <Modal />}
    </header>
  );
};
export default Header;
