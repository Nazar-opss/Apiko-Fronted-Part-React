import React, { useState } from 'react'
import arrow_left from './arrow_left.svg'
import StepperCom from './Stepper'

function Phone() {
    return (
        <div className='form_phone'>
            <select id='pnohe_prefix' name='prefix'>
                <option value={+1}>+1</option>
                <option value={+2}>+2</option>
                <option value={+3}>+3</option>
                <option value={+4}>+4</option>
                <option value={+5}>+5</option>
            </select>
            <input 
                type='text' 
                name='phone' 
                placeholder='Business phone number'
                className='phone_input'
            ></input>
        </div>
    )
}

function Radio(props) {
    return (
        <>
            <input 
                type="radio" 
                id={props.gender} 
                name="gender"
                value={props.value}>
            </input>
            <label 
                htmlFor={props.gender}>{props.value}
                {props.children}
            </label>
        </>
    )
}

function About() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            firstName: firstName,
            lastName: lastName
        })
    }

    const genderHeader = {fontSize: '18px', fontWeight:'500',lineHeight:'19px', letterSpacing:'0.15px', marginBottom: '25.5px'}
    return (
        <div>
            <h5 className='basic'>Basic information about you</h5>
            <StepperCom/>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form_inputs'>
                    <label htmlFor='firstName'>
                        <input 
                            type='text' 
                            name='firstName' 
                            placeholder='First name' 
                            className='form_name'
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                        ></input>
                    </label>
                    <label htmlFor='lastName'>
                        <input 
                            type='text' 
                            name='lastName' 
                            placeholder='Last name' 
                            className='form_name'
                            value={lastName} 
                            onChange={(e) => setlastName(e.target.value)}
                            style={{marginBottom: '30.5px'}}
                        ></input>
                    </label>
                    <p style={genderHeader}>Gender</p>
                </div>
            </form>
            <form className='form_gender'>
                <Radio
                    gender='male'
                    value='Male'
                />
                <br />
                <Radio
                    gender='female'
                    value='Female'
                />
                <br />
                <Radio
                    gender='ipnts'
                    value='I prefer not to say'
                />
                <br />
                <Radio
                    gender='other'
                    value='Other'
                    children={<input type='text'></input>}
                >
                </Radio>
            </form>
            <Phone/>
            <div className='form_buttons'>
                <button className='form_previous'>
                    <img src={arrow_left} alt='arrow'></img>
                    Previous
                </button>
                <button className='form_continue'>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default About