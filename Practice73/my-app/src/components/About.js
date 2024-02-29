import React, { useState, useContext } from 'react'
import StepperCom from './Stepper'
import validator from 'validator'
import { UserContext } from '../App' 
import Radio from './Radio'
import Phone from './Phone'
import PrevSubButton from './PrevSubButton'

const formInfoHeader = {fontSize: '18px', fontWeight:'500',lineHeight:'19px', letterSpacing:'0.15px', marginBottom: '25.5px'}

function AboutP1(props) {
    const user = useContext(UserContext);

    const handleGenderChange = (e) => {
        user.setGender(e.target.value);
    };

    return(
        <>
            <form className='form'>
                <div className='form_inputs'>
                    <label htmlFor='firstName'>
                        <input 
                            type='text' 
                            name='firstName' 
                            placeholder='First name' 
                            className='form_name'
                            value={user.fields.firstName}
                            // onChange={e => user.setFirstName(e.target.value)}
                            onChange={e => user.changeFieldValue(e)}
                        ></input>
                    </label>
                    <label htmlFor='lastName'>
                        <input 
                            type='text' 
                            name='lastName' 
                            placeholder='Last name' 
                            className='form_name'
                            value={user.fields.lastName} 
                            // onChange={e => user.setLastName(e.target.value)}
                            onChange={e => user.changeFieldValue(e)}
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
                    handleSelect={handleGenderChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='female'
                    name='gender'
                    value='Female'
                    handleSelect={handleGenderChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='ipnts'
                    name='gender'
                    value='I prefer not to say'
                    handleSelect={handleGenderChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='other'
                    name='gender'
                    value='Other'
                    children={<input type='text' onChange={
                        e => user.setGender(e.target.value)
                    }></input>}
                    handleSelect={handleGenderChange}
                >
                </Radio>
            </form>
            <Phone/>
            <PrevSubButton continue='Continue' nextHandle={props.handleNextClick} prevHandle={props.handlePrevClick}/>
        </>
    )
}

function AboutP2(props) {
    const user = useContext(UserContext);
    const [checked, setChecked] = useState([]);

    const handleWork = (e) => {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1)
        }
        setChecked(updatedList);
        user.setWork(updatedList);
    }

    const [errorStyle, setErrorStyle] = useState('') 
    const [disabled, setDisabled] = useState(true)

    const validate = (value) => { 
        if (validator.isStrongPassword(value, {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 0,
            minSymbols: 0,
        })) { 
            setErrorStyle('#0000008A') 
            setDisabled(false)
        } else { 
            setErrorStyle('red') 
            setDisabled(true)
        } 
    } 

    const handlePassword = (e) => {
        // user.setPassword(e.target.value)
        user.changeFieldValue(e);
        validate(e.target.value);
    }

    return (
        <>
            <p style={formInfoHeader}>Categories you work with</p>
            <form className='form_work'>
                <Radio
                    type='checkbox'
                    id='economy'
                    name='economy'
                    value='Economy'
                    handleSelect={handleWork}
                />
                <br />
                <Radio
                    type='checkbox'
                    id='business'
                    name='business'
                    value='Business'
                    handleSelect={handleWork}
                />
                <br />
                <Radio
                    type='checkbox'
                    id='trading'
                    name='trading'
                    value='Trading'
                    handleSelect={handleWork}
                />
                <br />
                <Radio
                    type='checkbox'
                    id='communications'
                    name='communications'
                    value='Сommunications'
                    handleSelect={handleWork}
                />
            </form>
            <div className='form_inputs' style={{marginBottom:'21px'}}>
                <label htmlFor='email'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='form_email'
                        value={user.fields.email}
                        // onChange={e => user.setEmail(e.target.value)}
                        onChange={e => user.changeFieldValue(e)}
                    ></input>
                </label>
                <label htmlFor='password' className='password_wrong'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='form_password'
                        value={user.fields.password}
                        onChange={handlePassword}
                    ></input>
                    <p className='password_validation' style={{color: errorStyle}}>
                        The password has to be at least 8 characters long and contain at least one upper case letter.
                    </p>
                </label>
                <PrevSubButton continue='Submit' nextHandle={props.handleNextClick} prevHandle={props.handlePrevClick} disabled={disabled}/>
            </div>
        </>
    )
}

function About({ prevHandle, switchToRolePicker }) {
    const user = useContext(UserContext);
    
    const [active, setActive] = useState('aboutp1');

    const handleNextClick = () => {
        user.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActive('aboutp2');
    };
    const handlePrevClick1 = () => {
        user.setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActive('aboutp1');
    };

    return (
            <div>
                <h5 className='basic' onClick={user.handleSubmit}>Basic information about you</h5>
                <StepperCom 
                    activeStep={user.activeStep}
                />
                {active === 'aboutp1' && <AboutP1 handleNextClick={handleNextClick} handlePrevClick={prevHandle}/> } 
                {active === 'aboutp2' && <AboutP2 handleNextClick={user.handleSubmit} handlePrevClick={handlePrevClick1}/> } 
            </div>
    )
}

export default About