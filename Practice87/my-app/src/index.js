import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,
      createBrowserRouter,
    RouterProvider, 
} from 'react-router-dom'
import { Movies, FilmList } from './Movies';
import { store } from './state/store';
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
    children: [
      {
        element:  <FilmList
                  url={`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`}
                  header='Favorite Movies'/>,
        index: true,
      },
      {
        path: "/top_rated",
        element: <FilmList
                  url={'https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&sort_by=created_at.asc'}
                  header='Top Rated Movies'
                  />
      },
      
      // children: [
      //   {
      //     path: "search/:name",
      //     element: <Catalog />,
      //     loader: async ({ params }) => fetchSearch(params.name),
      //   },
      //   {
      //     path: "letter/:letter",
      //     element: <Catalog />,
      //     loader: async ({ params }) => fetchData(params.letter),
      //   },
      //   {
      //     path: "cocktail/:id",
      //     element: <Cocktail />,
      //     loader: async ({ params }) => fetchDetails(params.id)
      //   },
      // ]
    ],
    
  },
 
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Movies />
  //   </BrowserRouter>
  // </React.StrictMode>
  <Provider store={store}>
    <RouterProvider
      router={router}
      fallbackElement={"loading"}
    />
  </Provider>
);

