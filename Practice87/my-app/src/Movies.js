import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import API from "./utils/Api.js";
import { ThemeContext } from "./components/ThemedButton.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader.js"
import { PopUp } from "./components/PopUp.js";
import { Film } from "./components/Film.js";
import { Link, Navigate, Route, Routes, Outlet, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

// const useFetchMovies = (url) => {
//     const [films, setFilms] = useState([]);
//     const [page, setPage] = useState(1)
//     const [total_pages, setTotalPages] = useState(0)
//     const [loading, setLoading] = useState(true)
//     const [urlLink, setUrl] = useState(url)
    
//     useEffect(() => {
//         async function fetch() {
//             try {
//                 setLoading(true)
//                 setFilms([])
//                 let fetchFilms1 = await API.fetchMovies(urlLink)
//                 setFilms(fetchFilms1.results)
//                 setPage(fetchFilms1.page)
//                 setTotalPages(fetchFilms1.total_pages)
//             } catch (error) {
//                 console.log("Error")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetch()
//     }, [urlLink])
    
//     return [{data: films, total: total_pages, page: page, loading: loading}, setUrl]
// }

export const FilmList = (props) => {
    useEffect(() =>{

    })

    const [selectedFilm, setSelectedFilm] = useState(null)
    
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];

    const { results, page, total_pages } = useLoaderData();

    const url = props.url;
    console.log(url)
    // const [{data, total, page, loading}, setUrl] = useFetchMovies(url)
    
    function setPageFetch(page){
        // setUrl(`${url}&page=${page}`);
    }

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    return(
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.foreground }}>{props.header}</h1>
            <Pagination
                page={page}
                // totalPages={total}
                totalPages={total_pages}
                changePage={setPageFetch}
                color={currentTheme.foreground}
            />
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
                //data.map(film => (
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
    console.log()
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];
    return (
        <div className="header">
            <nav className="router">
                <Link to={'/'} style={{color: currentTheme.foreground}}>Home</Link>
                <Link to={'/top_rated'} style={{color:currentTheme.foreground}}>Top Rated Movies</Link>
                <Link to={'/tv_shows'} onClick={blankWIP} style={{color: currentTheme.foreground}}>TV Shows</Link>
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
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];

    document.body.style.backgroundColor = currentTheme.background

    return(
        <Content />
    )
}
