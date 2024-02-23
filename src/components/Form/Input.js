import React from "react";
import './Input.css';

const input = props => {

    //console.log(props);
    
return (
    <div className="input">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.control === 'input' && (
            <input
                className={[
                    !props.valid ? 'invalid' : 'valid',
                    props.touched ? 'touched' : 'untouched'
                ].join(' ')}
                type={props.type}
                id={props.id}
                required={props.required}
                value={props.value}
                placeholder={props.placeholder}
                onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
                onBlur={props.onBlur}
            />
        )}
        {props.control === 'textarea' && (
            <textarea 
                className={[
                    !props.valid ? 'invalid' : 'valid', 
                    props.touched ? 'touched' : 'untouched'
                ].join(' ')}
                id={props.id}
                rows={props.rows}
                required={props.required}
                value={props.value}
                onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
                onBlur={props.onBlur}
            />
        )}
        {props.control === 'select' && (
            <select className={[
                !props.valid ? 'invalid' : 'valid',
                props.touched ? 'touched' : 'untouched'
            ].join(' ')}
            id={props.id}
            required={props.required}
            value={props.value}
            onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
            onBlur={props.onBlur}
            >
                <option value = "">Choose</option>
                {props.options.map(option => (
                    <option value={option.id}>{option.title}</option>
                ))}
            </select>
        )}
    </div>
    );
}

export default input;