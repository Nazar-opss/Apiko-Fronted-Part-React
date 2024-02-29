import React from 'react'

function Radio(props) {
    return (
        <>
            <input 
                type={props.type} 
                id={props.id} 
                name={props.name}
                value={props.value}
                onChange={props.handleSelect}
                checked={props.checked}
            >
            </input>
            <label 
                htmlFor={props.gender}>{props.value}
                {props.children}
            </label>
        </>
    )
}
export default Radio