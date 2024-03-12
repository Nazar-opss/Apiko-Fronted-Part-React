import React from "react";
import ReactDOM from 'react-dom'
import { useState } from "react";

function App() {
  const [isOpen, setOpen] = useState(false)
  const [textarea, setTextArea] = useState('')

  const submitModalWindow = (e) => {
    console.log(textarea)
  }

  const changeTextArea = (e) => {
    e.preventDefault()
    setTextArea(e.target.value)
  }

  const Modal = ({ Title, isOpen, closeModalWindow, submitModalWindow, Content }) => {
    // const [textarea, setTextArea] = useState('')
    
    if (!isOpen) return null
    return ReactDOM.createPortal(
      <>
      <div className="background"></div>
        <div className="modal">
          <span className="title">{Title}</span>
          {Content}
          {/* <textarea value={textarea} onChange={(e) => setTextArea(e.target.value)}/> */}
          <button onClick={closeModalWindow}>Close</button>
          <button onClick={submitModalWindow}>Submit</button>
        </div>
      </>,
      document.getElementById('modal'),
    )
  }
  
  // TODO: fix re-render in textarea onchange

  return (
    <div className={isOpen ? 'App_blur' : 'App'}>
      <button onClick={() => setOpen(true)}>Show Modal</button>
      <Modal 
        isOpen={isOpen}
        Title='Universal Modal Window'
        closeModalWindow={() => setOpen(false)}
        Content={<textarea defaultChecked='' value={textarea} onChange={(e) => setTextArea(e.target.value)}/>}
        submitModalWindow={submitModalWindow}
      />
    </div>
  );
}

export default App;
