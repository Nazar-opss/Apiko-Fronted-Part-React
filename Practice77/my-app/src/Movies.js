import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import API from "./utils/Api.js";
import { ThemeContext } from "./components/ThemedButton.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader"
import { PopUp } from "./components/PopUp.js";
import { Film } from "./components/Film.js";
import { Route } from "react-router-dom";

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

const FilmList = (props) => {
    const [selectedFilm, setSelectedFilm] = useState(null)
    
    const [{data, total, page, loading}, setUrl] = useFetchMovies('https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=1&sort_by=created_at.asc')

    // const [{data, total, page, loading}, setUrl] = useFetchMovies('https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&page=1&sort_by=created_at.asc')

    function setPageFetch(page){
        setUrl(`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`)
        // setUrl(`https://api.themoviedb.org/3/account/Invuukeeee/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`)
    }

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    return(
        <div>
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
    return (
        <div className="header">
            <ThemedToggleButton onClick={props.toggleTheme} />
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme.theme.foreground}` }}>Favourite Movies</h1>
            <FilmList
                color={theme.theme.foreground}
            />
        </div>
    )
}

// Try this
// <Route>
//     <FilmList props with link here/>
// </Route>

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
            <Content toggleTheme={toggleTheme}/>
        </ThemeContext.Provider>
    )
}
