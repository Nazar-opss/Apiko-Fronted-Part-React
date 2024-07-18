import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,
      createBrowserRouter,
    Navigate,
    redirect,
    RouterProvider,
    useNavigate, 
} from 'react-router-dom'
import { Movies, FilmList } from './Movies';
import { store } from './state/store';
import { Provider } from 'react-redux'
import Api from './utils/Api';


const fetchDetails = async (page_load, name) => {

  let fetchFilms1 = await Api.fetchMovies(`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=${page_load}&sort_by=created_at.asc`)
  const { results, page, total_pages } = fetchFilms1
  console.log(fetchFilms1)

  return { results, page, total_pages }
}

// fix path '/' and make top_rated

const router = createBrowserRouter([
  {
    path:'/',
    element: <Movies />,
    children: [
      {
            
            path:"/:page",
            index: true,
            element:  <FilmList
                      // url={`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`}
                      header='Favorite Movies'
                      />,
            loader: async ({ params }) => fetchDetails(params.page),
          
        
        // loader: async () => fetchDetails(`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`)
      },
      
      {
        path: "/top_rated/:page",
        element: <FilmList
                  url={'https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&sort_by=created_at.asc'}
                  header='Top Rated Movies'
                  />,
        loader: async ({ params }) => fetchDetails(params.page),
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

