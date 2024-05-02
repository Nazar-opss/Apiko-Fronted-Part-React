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

const fetchData = async (symbol) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${symbol}`);
  const jsonData = await response.json();
  return { jsonData }
}

//TODO:  
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
        path: "catalog/:letter",
        element: <Catalog />,
        loader: async ({ params }) => fetchData(params.letter),
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

