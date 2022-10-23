import { useReducer } from "react";

import './Calculator.css';

const Calculator_rdx = () => {

    const ACTIONS = {
        INPUT_DIGIT: 'input_digit',
        SET_OPERATOR: 'choose_operator',
        DELETE: 'delete',
        CLEAR: 'claer',
        EVALUATE: 'evaluate'
    };

    const [state, dispatch] = useReducer(reducer, {});


    function reducer(state, {type, payload}) {
        switch (type) {
            case ACTIONS.INPUT_DIGIT:
                if (state.fresh) {
                    return {
                        ...state,
                        currentOperand: payload.value,
                        fresh: false
                    }
                }
                if(payload.value === '.' && state.currentOperand.includes('.')) {
                    return state;
                }
                if(payload.value === '0' && state.currentOperand === '0') {
                    return state;
                }
                return {
                    ...state,
                    currentOperand: `${state.currentOperand || ''}${payload.value}`
                }
            case ACTIONS.SET_OPERATOR:
                if(state.currentOperand == null && state.previousOperand == null) {
                    return state;
                }
                // if(state.currentOperand == null) {
                //     return {
                //         ...state,
                //         operator: payload.operator,
                //         // previousOperand: `${state.previousOperand}${payload.operator}`,
                //     }
                // }
                if(state.previousOperand == null) {
                    return {
                        ...state,
                        operator: payload.operator,
                        previousOperand: `${state.currentOperand}${payload.operator}`,
                        currentOperand: null
                    }
                }
                console.log(state);
                return {
                    ...state,
                    operator: payload.operator,
                    // previousOperand: `(${evaluate(state)})${payload.operator}`,
                    previousOperand: `${evaluate(state)}${payload.operator}`,
                    currentOperand: null
                }
            case ACTIONS.EVALUATE: 
                if( state.currentOperand === null || state.previousOperand == null || state.operator === null) {
                    return state
                }
                return {
                    ...state,
                    previousOperand: null,
                    operator: null,
                    currentOperand: evaluate(state),
                    fresh: true
                }
            case ACTIONS.CLEAR:
                return {}
            case ACTIONS.DELETE:
                if (state.fresh) {
                    return {
                        ...state,
                        currentOperand: null,
                        fresh: false
                    }
                }
                if (state.currentOperand == null) return state;
                if (state.currentOperand.length === 1) {
                    return {
                        ...state,
                        currentOperand: null
                    }
                }
                return {
                    ...state,
                    currentOperand: state.currentOperand.slice(0, -1)
                }
            default:
                break;
        }
        console.log(state)

    }

    function evaluate({previousOperand, operator, currentOperand}) {
        console.log({previousOperand, operator, currentOperand});
        previousOperand = previousOperand.slice(0, -1);
        console.log(previousOperand)
        let result = ''
        switch (operator) {
            case '+':
                result = parseInt(previousOperand) + parseFloat(currentOperand)
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
                console.log(operator)
                break;
        }
        console.log(result)
        return result.toString()
    }
    
    return (
        <div className="calculator">
            <div className='output'>
                <div className='previous-operand'>{state.previousOperand}</div>
                <div className='current-operand'>{state.currentOperand}</div>
            </div>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '7'}})}>7</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '8'}})}>8</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '9'}})}>9</button>
            <button onClick={() => dispatch( {type: ACTIONS.DELETE})}>DEL</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '4'}})}>4</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '5'}})}>5</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '6'}})}>6</button>
            <button onClick={() => dispatch({ type: ACTIONS.SET_OPERATOR, payload: {operator: '+'}})}>+</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '1'}})}>1</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '2'}})}>2</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '3'}})}>3</button>
            <button onClick={() => dispatch({ type: ACTIONS.SET_OPERATOR, payload: {operator: '-'}})}>-</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '.'}})}>.</button>
            <button onClick={() => dispatch({type: ACTIONS.INPUT_DIGIT, payload: {value: '0'}})}>0</button>
            <button onClick={() => dispatch({ type: ACTIONS.SET_OPERATOR, payload: {operator: '/'}})}>/</button>
            <button onClick={() => dispatch({ type: ACTIONS.SET_OPERATOR, payload: {operator: '*'}})}>*</button>
            <button className='span-two' onClick={() => dispatch( {type: ACTIONS.CLEAR})}>AC</button>
            <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUATE, payload: { operator: '='}})}>=</button>
        </div>
    )
}

export default Calculator_rdx;