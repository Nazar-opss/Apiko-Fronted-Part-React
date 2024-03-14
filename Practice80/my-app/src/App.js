import React from "react";
import ReactDOM from 'react-dom'
import { useState, useRef } from "react";

function App() {
  const [isOpen, setOpen] = useState(false)

  const inputRef = useRef('');

  const text = inputRef.current.value

  const submitModalWindow = (e) => {
    setOpen(false)
    console.log(inputRef.current.value)
  }
  // TODO: fix show after submit first time
  const TextArea = () => {
    return(
        <textarea name="textArea" ref={inputRef} />
    )
  }

  const Modal = ({ Title, isOpen, closeModalWindow, submitModalWindow, Content }) => {
    if (!isOpen) return null
    return ReactDOM.createPortal(
      <>
        <div className="modal">
          <span className="title">{Title}</span>
          {Content}
          <button onClick={closeModalWindow}>Close</button>
          <button onClick={submitModalWindow}>Submit</button>
        </div>
      </>,
      document.getElementById('modal'),
    )
  }
  

  return (
    <div className={isOpen ? 'App_blur' : 'App'}>
      <button onClick={() => setOpen(true)}>Show Modal</button>
      {text}
      <Modal 
        isOpen={isOpen}
        Title='Universal Modal Window'
        closeModalWindow={() => setOpen(false)}
        Content={<TextArea />}
        submitModalWindow={submitModalWindow}
      />
    </div>
  );
}

export default App;
