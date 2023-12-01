import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const  docsLink = 'https://uk.legacy.reactjs.org/',
      imgLink = 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:45987bb8-1050-403e-8bc8-154fe4adc6a2/1045838839-Species-puffin-group-on-rock%20(1).jpg',
      h1 = 'This test text for homework page',
      h2 = 'Hello, New Stranger!',
      p = 'Here we have the list:',
      span1 = 'Here we have text and link!',
      span2 = 'And the picture!!!',
      text = 'Just text here'


function TextH1() {
  return ( <h1>{h1}</h1> );
}

function TextH2() {
  return ( <h2>{h2}</h2> );
}

function Br() {
  return <br></br>
}

function P() {
  return <p>{p}</p>
}

function Li({text, component}) {
  return (
    <li>
      <span>{text}</span>
      {component}
    </li>
  );
}

function LiTab() {
  return (
    <li tab-index="_1">
      {text}
    </li>
  )
}

function Docs() {
  return <a href={docsLink}>It is link to our docs</a>
}

function Image() {
  return <img src={imgLink} alt="Fox" width="300"></img>
}

function Ul() {
  return (
    <div>
      <LiTab />
      <Li 
        text={span1}
        component={<Docs />}
      />
      <Li 
        text={span2}
        component={<Image />}  
      />
    </div>
  )
}



export default function App() {
  return(
    <div>
      <TextH1 />
      <Br />
      <TextH2 />
      <Br />
      <P />
      <Ul />
    </div>
  )
}


root.render(
  <React.StrictMode>
    {/* <h3>My Test React App</h3> */}
    <App/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Завдання 2
// Використовуючи підготовлений проект, створити компонент App (в існуючому файлі index.js або в окремому, який імпортувати в існуючий). Даний компонент і має рендерити додаток як результат. В компоненті App переписати заданий HTML через React-елементи та React-компоненти. Усі статичні текстові дані винести у змінні і поміщати в React-компоненти через вирази (всередині фігурних дужок). Те ж саме і з усіма посиланнями.

//  <h1>This test text for homework page</h1>
//  <br></br>
//  <h2>Hello, New Stranger!</h2>
//  <br></br>
//  <p>Here we have the list:</p>
//  <ul>
//    <li tab-index="_1">
//      Just text here
//    </li>
//    <li>
//      <span>Here we have text and link!</span>
//      <a href="https://uk.reactjs.org/docs" target="_blank">It is link to our docs</a>
//    </li>
//    <li>
//      <span>And the picture!!!</span>
//      <img src="https://www.rspb.org.uk/globalassets/images/birds-and-wildlife/non-bird-species-illustrations/fox_1200x675.jpg" alt="Fox" width="300"></img>
//    </li>
//  </ul>
// </div>