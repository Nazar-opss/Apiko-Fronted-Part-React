import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
      createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom'
import { Movies, FilmList } from './Movies';
import { store } from './state/store';
import { Provider } from 'react-redux'
import Api from './utils/Api';
import GridLoader from 'react-spinners/GridLoader';

const fetchDetails = async (page_load, name) => { 

  let fetchFilms1 = await Api.fetchMovies(`https://api.themoviedb.org/3/account/Invuukeeee/${name}/movies?language=en-US&page=${page_load}&sort_by=created_at.asc`)
  const { results, page, total_pages } = fetchFilms1
  console.log(fetchFilms1)

  return { results, page, total_pages }
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <Movies />,
    children: [
      {
        path:"/:page",
        index: true,
        element:  <FilmList
                  header='Favorite Movies'
                  />,
        loader: async ({ params }) => fetchDetails(params.page, 'favorite'),
      },
      {
        path: "/top_rated/:page",
        element: <FilmList
                  header='Top Rated Movies'
                  />,
        loader: async ({ params }) => fetchDetails(params.page, 'rated'),
      },
      {
        path: "/tv_shows",
        element: <Navigate to='/1'/>
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
        fallbackElement={<GridLoader
                    className="loader"
                    size={100}
                    color={'black'}
                    loading={true}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
      />
    </Provider>
  // </React.StrictMode>
);

