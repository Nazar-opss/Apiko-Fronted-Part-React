import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './Appwrapper.js';
import AppItem from './AppItem.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const array = 'first element' 


root.render(
  <React.StrictMode>
    <AppWrapper
      title={'Заголовок'}>
      <h1>{array}</h1>
      <h1>{array}</h1>
      <h1>{array}</h1>
      <AppItem 
        name={'Text'}
        image={'https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg'}
        description={'Some description'}
      />
    </AppWrapper> 
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
