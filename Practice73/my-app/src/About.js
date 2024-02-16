import React, { useState, useContext } from 'react'
import arrow_left from './arrow_left.svg'
import StepperCom from './Stepper'

const UserContext = React.createContext();

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
    // console.log(fields)
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
    const user = useContext(UserContext);

    const [ radio, setRadioButton ] = useState('')
    // const { fields, changeFieldsValue } = useFormFields({
    //     firstName: '',
    //     lastName: '',
    //     radio: '',
    // })
    const handleChange = (event) => {
        console.log(event.target.id)
        setRadioButton(event.target.id);
        console.log(radio)
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log({
    //         firstName: fields.firstName,
    //         lastName: fields.lastName,
    //         radio: radio,
    //     })
    // }

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
                            value={user.firstName}
                            // onChange={changeFieldsValue}
                            onChange={e => user.setFirstName(e.target.value)}
                        ></input>
                    </label>
                    <label htmlFor='lastName'>
                        <input 
                            type='text' 
                            name='lastName' 
                            placeholder='Last name' 
                            className='form_name'
                            value={user.lastName} 
                            // onChange={changeFieldsValue}
                            onChange={e => user.setLastName(e.target.value)}
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
            {/* <PrevSubButton continue='Continue'/> */}
        </>
    )
}

function AboutP2() {
    const user = useContext(UserContext);
    // const { fields, changeFieldsValue} = useFormFields({
    //     email: '',
    //     password: '',
    // })

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log({
    //         lastName: fields.lastName,
    //         email: fields.email,
    //         password: fields.password,
    //     })
    // }

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
                        value={user.email}
                        // onChange={changeFieldsValue}
                        onChange={e => user.setEmail(e.target.value)}
                    ></input>
                </label>
                <label htmlFor='password'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='form_password'
                        value={user.password}
                        // onChange={changeFieldsValue}
                        onChange={e => user.setPassword(e.target.value)}
                        // onMouseLeave={checkPassword(password)}
                    ></input>
                    <p className='password_validation'>
                        The password has to be at least 8 characters long and contain at least one upper case letter.
                    </p>
                </label>
                {/* <PrevSubButton continue='Submit'/> */}
                {/* <button onClick={''}>CLICK</button> */}
            </div>
        </>
    )
}

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

    return (
        <div className='form_phone'>
            <select id='pnohe_prefix' name='prefix' value={prefix} onChange={handleChange}>
                <option value={'+1'}>+1</option>
                <option value={'+2'}>+2</option>
                <option value={'+3'}>+3</option>
                <option value={'+4'}>+4</option>
                <option value={'+5'}>+5</option>
            </select>
            {/* Дістати префікс телефона і додати до інпута */}
            <input 
                type='text' 
                name='phone' 
                placeholder='Business phone number'
                className='phone_input'
                value={user.phone}
                onChange={e => user.setPhone(e.target.value)}
                minLength="9"
                maxLength="11"
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('')

    const [active, setActive] = useState('aboutp1');
    const [activeStep, setActiveStep] = React.useState(0);

    // const { fields, changeFieldsValue} = useFormFields({
    //     firstName: '',
    //     lastName: '',
    //     radio: '',
    //     email: '',
    //     password: ''
    // })

    const handleSubmit = (e) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActive('aboutp2');
        console.log({
            // firstName: fields.firstName,
            // lastName: fields.lastName,
            // radio: fields.radio,
            // email: fields.email,
            // password: fields.password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
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
        <UserContext.Provider value={{ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, phone, setPhone }}>
            <div>
                <h5 className='basic' onClick={handleSubmit}>Basic information about you</h5>
                <StepperCom 
                    activeStep={activeStep}
                />
                {active === 'aboutp1' && <AboutP1 datasubmit={handleSubmit}/> } 
                {active === 'aboutp2' && <AboutP2 /> } 
                <PrevSubButton 
                    prevHandle={active === 'aboutp2' ? handlePrevClick : props.prevHandle}
                    nextHandle={active === 'aboutp1' ? handleNextClick : handleSubmit}
                    continue={active === 'aboutp2' ? 'Submit' : 'Continue'}
                />
            </div>
        </UserContext.Provider>
    )
}

export default About