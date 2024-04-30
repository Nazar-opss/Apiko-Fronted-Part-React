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
  try {
    // await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    //   .then(async response => await response.json())
    //   .then(data => setCocktail(data.drinks[0]))
    //   .catch((error) => console.log(error));
    const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?f=${symbol}`);
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.log("Error", error)
  }
}

//TODO: solve loader 
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
        path: "/catalog/:letter",
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

