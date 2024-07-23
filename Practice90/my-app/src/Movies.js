import React, { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import API from "./utils/Api.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader.js"
import { PopUp } from "./components/PopUp.js";
import { Film } from "./components/Film.js";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "./state/slice/fetchSlice.js";
import { store } from "./state/store.js";

// const useFetchMovies = (url) => {
//     // const { results, page, total_pages } = useLoaderData();
//     // const [films, setFilms] = useState([]);
//     // const [page, setPage] = useState(1)
//     // const [total_pages, setTotalPages] = useState(0)
//     // const [urlLink, setUrl] = useState(url)

//     const [loading, setLoading] = useState(true)

//     const dispatch = useDispatch()
    
//     const { results, page, total_pages } = useLoaderData();

//     console.log(results, page, total_pages)

//     useEffect(() => {
        
//         console.log('Loading state before fetch:', loading);
//         async function fetch() {
//             try {
//                 // setFilms([])
//                 // dispatch(setFetchList([]))
//                 // let fetchFilms1 = await API.fetchMovies(urlLink)
//                 // dispatch(setFetchList(fetchFilms1.results))
//                 // setFilms(fetchFilms1.results)
//                 // setPage(fetchFilms1.page)
//                 // setTotalPages(fetchFilms1.total_pages)
//                 setLoading(true)
//                 console.log(loading)
//                 console.log('Loading state after setting true:', loading);
//                 dispatch(setFetchList(results))
//                 // setPage(page_load)
//                 // setTotalPages(total_pages_load)
//             } catch (error) {
//                 console.log("Error")
//             } finally {
//                 setLoading(false)
//                 console.log('Loading state after setting false:', loading);

//             }
//         }
//         fetch()
//         console.log('Fetching movies with URL:', results);
//     }, [dispatch, results])
//     return { total: total_pages, page: page, loading: loading}
// }

export const FilmList = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log('useEffect running');
        dispatch(fetchContent())
    }, [dispatch])
    
    const [selectedFilm, setSelectedFilm] = useState(null)

    //The reason this happens is because the api call is asynchronus, it doesn't populate the state immediately, so the render happens first and tries to read .current from the initial weather state null.
    
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];
    
    const fetches = useSelector((state) => state.fetchList.fetches)
    const isLoading = useSelector((state) => state.fetchList.isLoading)
    const error = useSelector((state) => state.fetchList.error)
    
    const { page, total_pages, results } = fetches

    console.log(results)
    
    console.log(store.getState())

    
    // const fetchList = useSelector((state) => state.fetchList.fetches)
    // console.log(fetchList)

    // const { total, page, loading} = useFetchMovies()
    
    // console.log(results)

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    // if (isLoading) {
    //     return <GridLoader
    //     className="loader"
    //     size={100}
    //     color={currentTheme.foreground}
    //     loading={isLoading}
    //     speedMultiplier={1.5}
    //     aria-label="Loading Spinner"
    //     data-testid="loader"
    // />
    // }
    
    // if (error) {
    //     return error
    // }

    return(
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.foreground }}>{props.header}</h1>
            {/* <Pagination
                page={page}
                totalPages={total_pages}
                header={props.header}
                color={currentTheme.foreground}
            /> */}
            <GridLoader
                    className="loader"
                    size={100}
                    color={currentTheme.foreground}
                    // loading={loading}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            {
                // fetchList.map(film => ( */}
                results.map(film => (
                    <Film key={film.id} {...film} openLink={handleFilm} color={currentTheme.foreground} />
                ))
            }
            {selectedFilm && (
                    <PopUp filmLink={selectedFilm} closePopUp={() => handleFilm(null)}/>
                )}
        </div>
    )
}

const Content = (props) => {

    const blankWIP = () => {
        alert('This Page is under construction')
    }
    return (
        <div className="header">
            <nav className="router">
                <Link to={'/1'} style={{color: props.currentTheme.foreground}}>Home</Link>
                <Link to={'/top_rated/1'} style={{color: props.currentTheme.foreground}}>Top Rated Movies</Link>
                <Link to={'/tv_shows'} onClick={blankWIP} style={{color: props.currentTheme.foreground}}>TV Shows</Link>
            </nav>

            <ThemedToggleButton />

            <Outlet></Outlet>
            {/*         
            <Routes>
                <Route key='Favorite Movies' exact path="/" 
                    Component={() =>
                        <FilmList
                            url={`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&sort_by=created_at.asc`}
                            color={theme.theme.foreground}
                            header='Favorite Movies'
                        />
                    }
                />
                <Route key='Top Rated Movies' path="/top_rated"
                    Component={() =>
                        <FilmList
                            url={'https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&sort_by=created_at.asc'}
                            color={theme.theme.foreground}
                            header='Top Rated Movies'
                        />
                    }
                />
                <Route key='TV Shows' path="/tv_shows" 
                    element={<Navigate to='/' />}
                />
            </Routes> */}
        </div>
    )
}

export const Movies = () => {     
    // const navigate = useNavigate();
    // useEffect(()=> {
    //     navigate('/1')
    // },[navigate])
    
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];

    document.body.style.backgroundColor = currentTheme.background

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchContent())
    // }, [dispatch])
    
    // const fetches = useSelector((state) => state.fetchList.fetches)
    // const isLoading = useSelector((state) => state.fetchList.isLoading)
    // const error = useSelector((state) => state.fetchList.error)

    // console.log(fetches)

    return(
        <Content currentTheme={currentTheme} />
    )
}
