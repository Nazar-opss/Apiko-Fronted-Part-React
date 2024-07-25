import React, { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader.js"
import { PopUp } from "./components/PopUp.js";
import { Film } from "./components/Film.js";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesList } from "./state/slice/fetchSlice.js";
import { store } from "./state/store.js";

export const FilmList = (props) => {
    const [page_fetch, setPageFetch] = useState('')
    const [selectedFilm, setSelectedFilm] = useState(null)

    const dispatch = useDispatch()
    
    useEffect(() => {
        setPageFetch(1);
    }, [props.header]);

    useEffect(() => {
        console.log('useEffect running');
        
        props.header === 'Top Rated Movies' 
        ? dispatch(fetchMoviesList({pageFetch: page_fetch, fetchCategory: 'rated'})) 
        : dispatch(fetchMoviesList({pageFetch: page_fetch, fetchCategory: 'favorite'}))
        
    }, [dispatch, page_fetch, props.header])
    
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];
    
    const fetches = useSelector((state) => state.fetchList.fetches)
    const isLoading = useSelector((state) => state.fetchList.isLoading)
    const error = useSelector((state) => state.fetchList.error)
    
    let { total_pages, results } = fetches
    
    console.log(store.getState())

    const fetchMinus= () => {
        setPageFetch(page_fetch - 1)
    }
    const fetchPlus= () => {
        setPageFetch(page_fetch + 1)
    }

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    if (error) {
        return error
    }

    return(
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentTheme.foreground }}>{props.header}</h1>
            <Pagination
                page={page_fetch}
                totalPages={total_pages}
                header={props.header}
                color={currentTheme.foreground}
                page_fetchMinus={fetchMinus}
                page_fetchPlus={fetchPlus}
            />
            <GridLoader
                className="loader"
                size={100}
                color={currentTheme.foreground}
                loading={isLoading}
                speedMultiplier={1.5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            {
                results && results.map(film => (
                    <Film 
                        key={film.id} 
                        {...film} 
                        openLink={handleFilm} 
                        color={currentTheme.foreground} 
                    />
                )) 
            }
            {
                selectedFilm && (
                    <PopUp 
                        filmLink={selectedFilm} 
                        closePopUp={() => handleFilm(null)}
                    />
                )
            }
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
                <Link to={'/'} style={{color: props.currentTheme.foreground}}>Home</Link>
                <Link to={'/top_rated'} style={{color: props.currentTheme.foreground}}>Top Rated Movies</Link>
                <Link to={'/tv_shows'} onClick={blankWIP} style={{color: props.currentTheme.foreground}}>TV Shows</Link>
            </nav>

            <ThemedToggleButton />

            <Outlet></Outlet>
        </div>
    )
}

export const Movies = () => {     
    const theme = useSelector((state) => state.theme.theme)
    const currentTheme = themes[theme];

    document.body.style.backgroundColor = currentTheme.background


    return(
        <Content currentTheme={currentTheme} />
    )
}
