import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

import useInput from '../components/hooks/use-input';

const Backdrop = () => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(authActions.hideModal());
  };

  return <div onClick={hideModalHandler} className={styles.backdrop}></div>;
};

const ModalOverlay = props => {
  const dispatch = useDispatch();
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(
    enteredEmail => enteredEmail.includes('@') && enteredEmail.includes('.')
  );

  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(enteredPassword => enteredPassword.length >= 8);

  const isFormValid = emailIsValid && passwordIsValid;

  const loginHandler = e => {
    e.preventDefault();

    dispatch(authActions.login());
    dispatch(authActions.hideModal());
  };

  const cancelHandler = e => {
    e.preventDefault();
    dispatch(authActions.hideModal());
  };

  const emailClass = emailHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const passwordClass = passwordHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  return (
    <form className={styles.modal}>
      <label>Email</label>
      <input
        className={emailClass}
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        type="email"
      />
      <label>Password</label>
      <input
        className={passwordClass}
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        type="password"
      />
      <div className={styles.actions}>
        <p> {passwordHasError && 'Password must be 8 characters!'}</p>
        <div className={styles.buttons}>
          <button onClick={loginHandler} disabled={!isFormValid}>
            Login
          </button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

const overlay = document.getElementById('overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, overlay)}
      {ReactDOM.createPortal(<ModalOverlay />, overlay)}
    </Fragment>
  );
};
export default Modal;
