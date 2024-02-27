import React from 'react'
import { useState, useContext } from 'react';
import { UserContext } from './App';

function Phone() {
    const getInitialState = () => {
        const prefix = "+1";
        return prefix;
    };

    const user = useContext(UserContext);

    const [prefix, setPrefix] = useState(getInitialState)

    const handleChange = (e) => {
        setPrefix(e.target.value);
    };

    const handlePhoneChange = (e) => {
        user.setPhone(prefix + e.target.value);
    };

    return (
        <div className='form_phone'>
            <select id='pnohe_prefix' name='prefix' value={prefix} onChange={handleChange}>
                <option value={'+1'}>+1</option>
                <option value={'+2'}>+2</option>
                <option value={'+3'}>+3</option>
                <option value={'+4'}>+4</option>
                <option value={'+5'}>+5</option>
            </select>
            <input 
                type='text' 
                name='phone' 
                placeholder='Business phone number'
                className='phone_input'
                value={user.phone.replace(prefix, '')}
                onChange={handlePhoneChange}
                minLength="9"
                maxLength="11"
            ></input>
        </div>
    )
}

export default Phone