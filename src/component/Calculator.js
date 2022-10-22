import { useState } from 'react';

import './Calculator.css';

const Calculator = () => {

  // const [currentOperand, setCurrentOperand] = useState('');
  // const [previousOperand, setPreviousOperand] = useState('');
  // const [operator, setOperator] = useState('');

  // const [display, setDisplay] = useState({
  //   currentOperand: '',
  //   previousOperand: '',
  //   operator: ''
  // })

  const [display, setDisplay] = useState({})

  const handleCurrentOperand = (digit) => {
    if(digit === '.' && display.currentOperand.includes('.')) {
      return display;
    }
    if(digit === '0' && display.currentOperand === '0') {
      return display;
    }
    setDisplay(prev => ({
      ...prev,
      currentOperand: `${display.currentOperand || ''}${digit}`
    }))
  }
  console.log(display)

  const handlePreviousOperand = (operator) => {
    console.log(display)
    if(display.currentOperand == null && display.previousOperand == null) {
      return display
    } else if(display.currentOperand == null) {
      // console.log(display)
      setDisplay(prev => ({
        ...prev,
        operator: operator
      }))
    } else if(display.previousOperand == null) {
      console.log('display')
      setDisplay(prev => ({
        ...prev,
        previousOperand: `${display.currentOperand}${operator}`,
        currentOperand: null
      }))
    } else {

      const pend = evaluate(display, operator)
      setDisplay(prev => ({
        ...prev,
        // previousOperand: eval(7+7),
        operator: operator,
        currentOperand: null,
        previousOperand: `${pend.previousOperand}${operator}`,
      }))
      console.log(display)
    }



    // return {
    //   ...display,
    //   // previousOperand: eval(7+7),
    //   operator: operator,
    //   currentOperand: '',
    //   previousOperand: evaluate(display),
    // }
    
  }

  const handleClear = () => {
    setDisplay({});
  }

  const backspace = () => {
    if (!display.currentOperand || display.currentOperand === null) {
      // return display
      setDisplay({})
    } else if(display.currentOperand.length === 1) {
      setDisplay(prev => ({
        ...prev,
        currentOperand: null
      }))
    } else {
      setDisplay(prev => ({
        ...prev,
        currentOperand: display.currentOperand.slice(0, -1)
      }))
    }
    
  }

  const result = () => {
    if( display.currentOperand === null || display.previousOperand == null || display.operator === null) {
      setDisplay((prev) => ({...prev}))
    }
    else {
      // const pend = evaluate(display);
      // console.log(pend);

      // setDisplay(prev => ({
      //   ...prev,
      //   previousOperand: null,
      //   operator: null,
      //   currentOperand: pend.previousOperand,
      // }))

      // previousOperand = previousOperand.slice(0, -1);
      // console.log(previousOperand)
      // let result = '';
    }
  }

  function evaluate({currentOperand, previousOperand}, operator) {
    console.log(display);
    previousOperand = previousOperand.slice(0, -1);
    console.log(previousOperand)
    let result;

    switch (operator) {
      case '+':
        result= parseInt(previousOperand) + parseFloat(currentOperand)
        break;
      case '*':
        result = parseInt(previousOperand) * parseFloat(currentOperand)
        break;
      case '-':
        result = parseInt(previousOperand) - parseFloat(currentOperand)
        break;
      case '/':
        result = parseInt(previousOperand) / parseFloat(currentOperand)
        break;
    
      default:
        break;
    }
    return {
      ...display,
      // previousOperand: eval(7+7),
      operator: operator,
      currentOperand: '',
      previousOperand: result.toString(),
    }
    // setDisplay(prev => ({
    //   ...prev,
    //   // previousOperand: eval(7+7),
    //   operator: operator,
    //   currentOperand: '',
    //   previousOperand: '',
    // }))
  }

  return (
    <div className="calculator">
      <div className='output'>
        <div className='previous-operand'>{display.previousOperand}</div>
        <div className='current-operand'>{display.currentOperand}</div>
      </div>
      <button className='span-two' onClick={handleClear}>AC</button>
      <button onClick={backspace}>DEL</button>
      <button onClick={() => handlePreviousOperand('+')}>+</button>
      <button onClick={() => handleCurrentOperand('7')}>7</button>
      <button onClick={() => handleCurrentOperand('8')}>8</button>
      <button onClick={() => handleCurrentOperand('9')}>9</button>
      <button onClick={() => handlePreviousOperand('*')}>*</button>
      <button onClick={() => handleCurrentOperand('4')}>4</button>
      <button onClick={() => handleCurrentOperand('5')}>5</button>
      <button onClick={() => handleCurrentOperand('6')}>6</button>
      <button onClick={() => handlePreviousOperand('/')}>/</button>
      <button onClick={() => handleCurrentOperand('3')}>3</button>
      <button onClick={() => handleCurrentOperand('2')}>2</button>
      <button onClick={() => handleCurrentOperand('1')}>1</button>
      <button onClick={() => handlePreviousOperand('-')}>-</button>
      <button onClick={() => handleCurrentOperand('.')}>.</button>
      <button onClick={() => handleCurrentOperand('0')}>0</button>
      <button className='span-two' onClick={result}>=</button>
    </div>
  );
}

export default Calculator;
