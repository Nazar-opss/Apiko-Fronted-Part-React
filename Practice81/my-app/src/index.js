import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom'
import Catalog from './pages/Catalog';
import Cocktail from './pages/Cocktail';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainPage/>,
        index: true,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "cocktail",
        element: <Cocktail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={"loading"}
  />
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   // </React.StrictMode> 
// );

