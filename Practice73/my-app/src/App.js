import React, { useState } from 'react'
import RolePicker from './RolePicker'
import About from './About'

export const UserContext = React.createContext();

function App() {
  const [profession, setProfession] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [work, setWork] = useState('');

  const [activeStep, setActiveStep] = React.useState(0);

  const [active, setActive] = useState('rolePicker');

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log({
        profession: profession,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        gender: gender,
        work: work,
    })
    setActiveStep(0);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setGender('');
    setWork('');
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
    <UserContext.Provider value={{ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, phone, setPhone, gender, setGender, work, setWork, profession, setProfession, activeStep, setActiveStep, handleSubmit }}>
      <div className='form'>
        {active === 'rolePicker' && <RolePicker handle={handleClick}/> } 
        {active === 'about' && <About prevHandle={handlePrevClick} switchToRolePicker={switchToRolePicker}/> } 
      </div>
    </UserContext.Provider>
  )
}

export default App