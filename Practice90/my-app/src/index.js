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
import GridLoader from 'react-spinners/GridLoader';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Movies />,
    children: [
      {
        index: true,
        element:  <FilmList
                  header='Favorite Movies'
                  />,
        // loader: async ({ params }) => fetchDetails(params.page, 'favorite'),
      },
      {
        path: "/top_rated",
        element: <FilmList
                  header='Top Rated Movies'
                  />,
        // loader: async ({ params }) => fetchDetails(params.page, 'rated'),
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
  <React.StrictMode>
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
  </React.StrictMode>
);

