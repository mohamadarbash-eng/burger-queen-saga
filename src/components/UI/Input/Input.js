import React from "react";
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
    inputClasses =  inputClasses.join(' ');

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.change} onBlur={props.setTouched}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.change}/>;
            break;
        case ('select'):
            inputElement = (<select className={inputClasses} value={props.value} onChange={props.change}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayName}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.change}/>

       }
    return (
        <div className={classes.Input}>
            <label htmlFor="" className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};


export default Input;
