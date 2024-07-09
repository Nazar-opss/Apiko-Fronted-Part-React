import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import API from "./utils/Api.js";
import { ThemeContext } from "./components/ThemedButton.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader.js"
import { PopUp } from "./components/PopUp.js";
import { Film } from "./components/Film.js";
import { Link, Navigate, Route, Routes, Outlet } from "react-router-dom";

const useFetchMovies = (url) => {
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)
    const [total_pages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [urlLink, setUrl] = useState(url)
    
    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true)
                setFilms([])
                let fetchFilms1 = await API.fetchMovies(urlLink)
                setFilms(fetchFilms1.results)
                setPage(fetchFilms1.page)
                setTotalPages(fetchFilms1.total_pages)
            } catch (error) {
                console.log("Error")
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [urlLink])
    
    return [{data: films, total: total_pages, page: page, loading: loading}, setUrl]
}

export const FilmList = (props) => {
    const [selectedFilm, setSelectedFilm] = useState(null)
    
    const url = props.url;

    const [{data, total, page, loading}, setUrl] = useFetchMovies(url)
    
    function setPageFetch(page){
        setUrl(`${url}&page=${page}`);
    }

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    return(
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${props.color}` }}>{props.header}</h1>
            <Pagination
                page={page}
                totalPages={total}
                changePage={setPageFetch}
                color={props.color}
            />
            <GridLoader
                    className="loader"
                    size={100}
                    color={props.color}
                    loading={loading}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            {
                data.map(film => (
                    <Film key={film.id} {...film} openLink={handleFilm} color={props.color} />
                ))
            }
            {selectedFilm && (
                    <PopUp filmLink={selectedFilm} closePopUp={() => handleFilm(null)}/>
                )}
        </div>
    )
}

const Content = (props) => {
    const theme = useContext(ThemeContext)
    const blankWIP = () => {
        alert('This Page is under construction')
    }
    console.log()
    return (
        <div className="header">
            <nav className="router">
                <Link to={'/'} style={{color: `${theme.theme.foreground}`}}>Home</Link>
                <Link to={'/top_rated'} style={{color: `${theme.theme.foreground}`}}>Top Rated Movies</Link>
                <Link to={'/tv_shows'} onClick={blankWIP} style={{color: `${theme.theme.foreground}`}}>TV Shows</Link>
            </nav>

            <ThemedToggleButton onClick={theme.toggleTheme} />

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
    const [currentTheme, setTheme] = useState(themes.dark)
    document.body.style.backgroundColor = currentTheme.background

    const toggleTheme = () => {
        setTheme((prevTheme) => (
            prevTheme === themes.dark ? themes.light : themes.dark
        ));
    };
    return(
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <Content />
        </ThemeContext.Provider>
    )
}
