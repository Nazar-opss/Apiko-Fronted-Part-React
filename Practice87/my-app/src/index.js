import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,
      createBrowserRouter,
    Navigate,
    RouterProvider, 
} from 'react-router-dom'
import { Movies, FilmList } from './Movies';
import { store } from './state/store';
import { Provider } from 'react-redux'
import Api from './utils/Api';


const fetchDetails = async (urlLink) => {
  let fetchFilms1 = await Api.fetchMovies(urlLink)
  const { results, page, total_pages } = fetchFilms1
  console.log(fetchFilms1)

  return { results, page, total_pages }
}

// fix router to work pagination with render

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Movies />,
    children: [
      {
        path:"/:page",
        element:  <FilmList
                  url={`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`}
                  header='Favorite Movies'
                  />,
        index: true,
        loader: async () => fetchDetails(`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`)
      },
      {
        path: "/top_rated",
        element: <FilmList
                  url={'https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&sort_by=created_at.asc'}
                  header='Top Rated Movies'
                  />,
        // loader:() => fetchDetails('https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&sort_by=created_at.asc')
      },
      {
        path: "/tv_shows",
        element: <Navigate to='/'/>
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={router}
        fallbackElement={"loading"}
      />
    </Provider>
  // </React.StrictMode>
);

