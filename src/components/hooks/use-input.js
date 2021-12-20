import { useState } from 'react';

const useInput = validateFun => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFun(enteredValue);
  const hasError = !validateFun(enteredValue) && isTouched;

  const changeHandler = e => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
  };
};

export default useInput;
