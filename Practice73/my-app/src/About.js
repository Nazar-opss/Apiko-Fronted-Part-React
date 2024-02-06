import React, { useState } from 'react'
import arrow_left from './arrow_left.svg'
import StepperCom from './Stepper'


const formInfoHeader = {fontSize: '18px', fontWeight:'500',lineHeight:'19px', letterSpacing:'0.15px', marginBottom: '25.5px'}

const PrevSubButton = (props) => {
    return (
        <div className='form_buttons'>
            <button className='form_previous'>
                <img src={arrow_left} alt='arrow'></img>
                Previous
            </button>
            <button className='form_continue'>
                Continue
            </button>
        </div>
    )
}

function AboutP1() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            firstName: firstName,
            lastName: lastName
        })
    }
    return(
        <>
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
                    <p style={formInfoHeader}>Gender</p>
                </div>
            </form>
            <form className='form_gender'>
                <Radio
                    type='radio'
                    id='male'
                    name='gender'
                    value='Male'
                />
                <br />
                <Radio
                    type='radio'
                    id='female'
                    name='gender'
                    value='Female'
                />
                <br />
                <Radio
                    type='radio'
                    id='ipnts'
                    name='gender'
                    value='I prefer not to say'
                />
                <br />
                <Radio
                    type='radio'
                    id='other'
                    value='Other'
                    name='gender'
                    children={<input type='text'></input>}
                >
                </Radio>
            </form>
            <Phone/>
        </>
    )
}

function AboutP2() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <p style={formInfoHeader}>Categories you work with</p>
            <form className='form_work'>
                <Radio
                    type='checkbox'
                    id='economy'
                    name='economy'
                    value='Economy'
                />
                <br />
                <Radio
                    type='checkbox'
                    id='business'
                    name='business'
                    value='Business'
                />
                <br />
                <Radio
                    type='checkbox'
                    id='trading'
                    name='trading'
                    value='Trading'
                />
                <br />
                <Radio
                    type='checkbox'
                    id='communications'
                    name='communications'
                    value='Сommunications'
                >
                </Radio>
            </form>
            <div className='form_inputs' style={{marginBottom:'21px'}}>
                <label htmlFor='email'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='form_email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </label>
                <label htmlFor='password'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='form_password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <p className='password_validation'>
                        The password has to be at least 8 characters long and contain at least one upper case letter.
                    </p>
                </label>
            </div>
        </>
    )
}

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
                type={props.type} 
                id={props.id} 
                name={props.name}
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
    return (
        <div>
            <h5 className='basic'>Basic information about you</h5>
            <StepperCom/>
            <AboutP1/>
            {/* <AboutP2/> */}
            <PrevSubButton/>
        </div>
    )
}

export default About