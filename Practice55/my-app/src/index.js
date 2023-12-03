import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const  docsLink = 'https://uk.legacy.reactjs.org/',
      imgLink = 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:45987bb8-1050-403e-8bc8-154fe4adc6a2/1045838839-Species-puffin-group-on-rock%20(1).jpg',
      h1 = 'This test text for homework page',
      p = 'Here we have the list:',
      span1 = 'Here we have text and link!',
      span2 = 'And the picture!!!',
      text = 'Just text here',
      firstNameSara = 'Sara', 
      lastNameConnor = 'Connor',
      firstNameJonh = 'Jonh', 
      lastNameDoe = 'Doe'



function TextH1() {
  return ( <h1 style={{color: 'green'}}>{h1}</h1> );
}

function TextH2() {
  return ( <h2 style={{textDecoration: 'underline'}}>Welcome to website, {FormatUserName(firstNameSara, lastNameConnor)}</h2> );
}

function TextH3() {
  return ( <h3 style={{opacity: '25%'}}>Welcome to website, {FormatUserName(firstNameJonh, lastNameDoe)}</h3> );
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
  return <a href={docsLink} className='docs_link'>It is link to our docs</a>
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

function FormatUserName(firstName, lastName) {
  return firstName + lastName
}

export default function App() {
  return(
    <div>
      <TextH1 />
      <Br />
      <TextH2 />
      <Br />
      <TextH3 />
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

// Practice: Create your first react app
// Завдання 1
// Використовуючи інструкцію бібліотеки create-react-app(https://create-react-app.dev/) встановити та запустити свій перший React-проект. Переглянути наявні файли та структуру додатку. Опісля видалити усі допоміжні файли із папки src/ - має залишитись лише index.js. Код даного файлу також підправити, видаливши непотрібні залежності. Як результат додаток має просто рендерити стрічку My Test React App.

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
// Завдання 3
// Описати функцію formatUserName - вона повинна приймати 2 агрументи - (firstName, lastName). Дана функція повинна повертати строку, яка містить наступний текст - Welcome to website, <firstName> <lastName>. В раніше описаному компоненті App у тегу h2 замінити текст ‘Hello, New Stranger’ даною функцією. Результатом має бути вітання ‘Welcome to website, Sara Connor’. Добавити в розмітку ще один тег h3, який використовуватиме ту ж функцію і міститеме привітання для John Doe.

// Завдання 4
// Створити додатковий файл із стилями *.css у підготовленому проекті. Описати стилі для React-компонентів та елементів уже опрацьованого компонента App (по власному бажанню і дизайнерським баченням). Дані стилі імпортувати в index.js, та застосувати до компонентів через атрибут className. Стилі для тегу h1 повинні бути заданні через інлайн-стилі, а саме за допомогою атрибута style.