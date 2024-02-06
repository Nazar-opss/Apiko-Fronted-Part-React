import React, { useState } from 'react'
import RolePicker from './RolePicker'
import About from './About'

function App() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = (event) => {
    event.preventDefault()
    setShowComponent(true);
  };

  return (
    <div className='form'>
      <RolePicker 
        handle={handleClick}
      />
      {showComponent && <About />}
      {/* <About/> */}
    </div>
  )
}

export default App