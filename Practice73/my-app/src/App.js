import React, { useState } from 'react'
import RolePicker from './RolePicker'
import About from './About'

function App() {
  const [active, setActive] = useState('rolePicker');

  const handleClick = (event) => {
    event.preventDefault()
    setActive('about');
  };
  const handlePrevClick = (event) => {
    event.preventDefault()
    setActive('rolePicker');
  };

  return (
    <div className='form'>
      {active === 'rolePicker' && <RolePicker handle={handleClick}/> } 
      {active === 'about' && <About prevHandle={handlePrevClick}/> } 
    </div>
  )
}

export default App