import React, { useState } from 'react'
import arrow_left from './arrow_left.svg'
import StepperCom from './Stepper'


const formInfoHeader = {fontSize: '18px', fontWeight:'500',lineHeight:'19px', letterSpacing:'0.15px', marginBottom: '25.5px'}

const useFormFields = (initialValues) =>{
    const [fields, setFormFields] = useState(initialValues);

    const changeFieldsValue = (e) => {
        const {name, value} = e.target;
        setFormFields(prev =>({
            ...prev,
            [name]: value,
        }));
    }
    return {fields, changeFieldsValue};
}

const PrevSubButton = (props) => {
    return (
        <div className='form_buttons'>
            <button className='form_previous' onClick={props.prevHandle}>
                <img src={arrow_left} alt='arrow'></img>
                Previous
            </button>
            <button className='form_continue' onClick={props.nextHandle}>
                {props.continue}
            </button>
        </div>
    )
}

function AboutP1(props) {
    const [ radio, setRadioButton ] = useState('')
    const { fields, changeFieldsValue } = useFormFields({
        firstName: '',
        lastName: '',
        radio: '',
    })
    // зібрати всьо в один хук, трай віз context 
    const handleChange = (event) => {
        console.log(event.target.id)
        setRadioButton(event.target.id);
        console.log(radio)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            firstName: fields.firstName,
            lastName: fields.lastName,
            radio: radio,
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
                            value={fields.firstName}
                            onChange={changeFieldsValue}
                        ></input>
                    </label>
                    <label htmlFor='lastName'>
                        <input 
                            type='text' 
                            name='lastName' 
                            placeholder='Last name' 
                            className='form_name'
                            value={fields.lastName} 
                            onChange={changeFieldsValue}
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
                    select={handleChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='female'
                    name='gender'
                    value='Female'
                    select={handleChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='ipnts'
                    name='gender'
                    value='I prefer not to say'
                    select={handleChange}
                />
                <br />
                <Radio
                    type='radio'
                    id='other'
                    name='gender'
                    value='Other'
                    children={<input type='text'></input>}
                    select={handleChange}
                >
                </Radio>
            </form>
            <Phone/>
            <button onClick={props.datasubmit}>CLICK</button>
        </>
    )
}

function AboutP2() {
    const { fields, changeFieldsValue} = useFormFields({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email: fields.email,
            password: fields.password,
        })
    }

    const checkPassword = (value) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let password = value;
        let result = regex.test(password);
        console.log(result)
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
                        value={fields.email}
                        onChange={changeFieldsValue}
                    ></input>
                </label>
                <label htmlFor='password'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='form_password'
                        value={fields.password}
                        onChange={changeFieldsValue}
                        // onMouseLeave={checkPassword(password)}
                    ></input>
                    <p className='password_validation'>
                        The password has to be at least 8 characters long and contain at least one upper case letter.
                    </p>
                </label>
                <button onClick={handleSubmit}>CLICK</button>
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
    function radioChange(event) {
        console.log(event.target.value)
    }

    return (
        <>
            <input 
                type={props.type} 
                id={props.id} 
                name={props.name}
                value={props.value}
                // onChange={(e) => radioChange(e)}
                onChange={props.select}
            >
            </input>
            <label 
                htmlFor={props.gender}>{props.value}
                {props.children}
            </label>
        </>
    )
}

function About(props) {
    const [active, setActive] = useState('aboutp1');
    const [activeStep, setActiveStep] = React.useState(0);

    const { fields, changeFieldsValue} = useFormFields({
        firstName: '',
        lastName: '',
        radio: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            firstName: fields.firstName,
            lastName: fields.lastName,
            radio: fields.radio,
            email: fields.email,
            password: fields.password,
        })
    }

    const handleNextClick = (event) => {
        event.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActive('aboutp2');
    };
    const handlePrevClick = (event) => {
        event.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActive('aboutp1');
    };
    return (
        <div>
            <h5 className='basic' onClick={handleSubmit}>Basic information about you</h5>
            <StepperCom 
                activeStep={activeStep}
            />
            {active === 'aboutp1' && <AboutP1 datasubmit={handleSubmit}/> } 
            {active === 'aboutp2' && <AboutP2 /> } 
            <PrevSubButton 
                prevHandle={active === 'aboutp2' ? handlePrevClick : props.prevHandle}
                nextHandle={active === 'aboutp1' ? handleNextClick || handleSubmit : ''}
                continue={active === 'aboutp2' ? 'Submit' : 'Continue'}
            />
        </div>
    )
}

export default About