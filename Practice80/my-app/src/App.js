import React from "react";
import ReactDOM from 'react-dom'
import { useState, useRef } from "react";

function App() {
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef('');

  const submitModalWindow = (e) => {
    const text = inputRef.current.value;
    inputRef.current = 0
    setInputValue(text)
    setOpen(false)
  }

  const TextArea = () => {
    return(
        <textarea 
          name="textArea" 
          className="textArea" 
          ref={inputRef} 
          rows={4}
          cols={20}
        />
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
      <button className="App_show" onClick={() => setOpen(true)}>Show Modal</button>
      <h2 className="wrap">
        {inputValue}
      </h2>
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
