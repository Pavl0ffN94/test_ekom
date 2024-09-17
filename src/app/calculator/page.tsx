'use client';
import {useState, useEffect, useCallback} from 'react';
import styles from './styles.module.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number>(0);

  const handleButtonClick = (value: string) => {
    setInput(prev => prev + value);
  };

  const calculateResult = useCallback(() => {
    try {
      setResult(eval(input));
      clearInput();
    } catch (error) {
      setResult(0);
    }
  }, [input]);

  const clearInput = () => {
    setInput('');
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const value = event.key;
      if ('0123456789+-*/.'.includes(value)) {
        setInput(prev => prev + value);
      } else if (value === 'Enter') {
        calculateResult();
      } else if (value === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
      }
    },
    [calculateResult],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <section className={styles.container}>
      <h1>Калькулятор</h1>
      <input className={styles.input} type='text' value={input} readOnly />
      <div className={styles.buttonGrid}>
        <div className={styles.digits}>
          <button className={styles.button} onClick={() => handleButtonClick('1')}>
            1
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('2')}>
            2
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('3')}>
            3
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('4')}>
            4
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('5')}>
            5
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('6')}>
            6
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('7')}>
            7
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('8')}>
            8
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('9')}>
            9
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('0')}>
            0
          </button>
          <button className={styles.button} onClick={() => clearInput()}>
            C
          </button>
        </div>

        <div>
          <button className={styles.button} onClick={() => handleButtonClick('+')}>
            +
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('-')}>
            -
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('*')}>
            *
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('/')}>
            /
          </button>
          <button className={styles.button} onClick={() => handleButtonClick('.')}>
            .
          </button>
          <button className={styles.button} onClick={calculateResult}>
            =
          </button>
        </div>
      </div>
      <h2 className={styles.result}>Результат: {result !== null ? result : 'Ошибка'}</h2>
    </section>
  );
};

export default Calculator;
