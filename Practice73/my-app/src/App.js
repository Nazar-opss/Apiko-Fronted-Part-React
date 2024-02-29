import React, { useState } from 'react'
import RolePicker from './components/RolePicker'
import About from './components/About'

export const UserContext = React.createContext();

const useFormFields = (initialValues) => {
  const [ fields, setFormFields ] = useState(initialValues);
  const changeFieldValue = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return { fields, changeFieldValue };
}

function App() {
  const { fields, changeFieldValue } = useFormFields({
    firstName: '', 
    lastName: '', 
    email: '', 
    password:  '',
  }); 


  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [work, setWork] = useState('');
  const [gender, setGender] = useState('');

  const [activeStep, setActiveStep] = React.useState(0);

  const [active, setActive] = useState('rolePicker');

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log({
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        password: fields.password,
        profession: profession,        
        phone: phone,
        gender: gender,
        work: work,
    })
    setActiveStep(0);
    setPhone('');
    setWork('');
    setGender('');
    fields.firstName = '';
    fields.lastName = '';
    fields.email = '';
    fields.password = '';
    switchToRolePicker();
}

  const handleClick = (event) => {
    event.preventDefault()
    setActive('about');
  };
  const handlePrevClick = (event) => {
    event.preventDefault()
    setActive('rolePicker');
  };
  const switchToRolePicker = () => {
    setActive('rolePicker');
};

  return (
    <UserContext.Provider value={{ fields, changeFieldValue, activeStep, setActiveStep, handleSubmit, profession, setProfession, phone, setPhone, work, setWork, gender, setGender }}>
      <div className='form'>
        {active === 'rolePicker' && <RolePicker handle={handleClick}/> } 
        {active === 'about' && <About prevHandle={handlePrevClick} switchToRolePicker={switchToRolePicker}/> } 
      </div>
    </UserContext.Provider>
  )
}

export default App