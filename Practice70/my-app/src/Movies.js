import React, { useContext } from "react";
import { RateSwitch } from "./components/RateSwitch.js";
import { Pagination } from "./components/Pagination.js";
import { ThemedToggleButton } from "./components/ThemedButton.js";
import API from "./utils/Api.js";
import { ThemeContext } from "./components/ThemedButton.js";
import { themes } from "./utils/const.js";
import GridLoader from "react-spinners/GridLoader"
import { useEffect } from "react";
import { useState } from "react";

const PopUp = ({ filmLink, closePopUp }) => {
    return(
        <div className="popUp">
            <div onClick={closePopUp} style={{cursor: 'pointer', color: 'red', border: '2px solid'}}>X</div>
            <div>Release Date: {filmLink}</div>
        </div>
    )
}

const Film = ({ title, overview, poster_path, popularity, openLink, release_date, color, children }) => {
    const imagePath = "https://image.tmdb.org/t/p/w300";
    return (
        <div className="Film">
            <h2 style={{ color: `${color}` }}>{title}</h2>
            <img src={imagePath + poster_path} alt="" onClick={() => openLink(release_date)}></img>
            <p style={{ color: `${color}` }}>{overview}</p>
            <RateSwitch popularity={popularity} color={color} />
            <hr className="solid"></hr>
            {children}
        </div>
    )
}

export const FilmList1 = (props) => {
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)
    const [selectedFilm, setSelectedFilm] = useState(null)
    const [total_pages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    async function fetch(page) {
        try {
            setLoading(true)
            setFilms([])
            let fetchFilms1 = await API.fetchMovies(page)
            setFilms(fetchFilms1.results)
            setPage(fetchFilms1.page)
            setTotalPages(fetchFilms1.total_pages)
        } catch (error) {
            console.log("Error")
        } finally {
            setLoading(false)
        }
    }

    function handleFilm(selectedFilm) {
        setSelectedFilm(selectedFilm)
    }

    return(
        <div>
            <Pagination
                page={page}
                totalPages={total_pages}
                changePage={fetch}
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
                films.map(film => (
                    <Film key={film.id} {...film} openLink={handleFilm} color={props.color} />
                ))
            }
            {selectedFilm && (
                    <PopUp filmLink={selectedFilm} closePopUp={() => handleFilm(null)}/>
                )}
        </div>
    )
}

// class FilmList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             listOfFilms: [],
//             totalPages: 1,
//             page: 1,
//             loading: true,
//             selectedFilm: null,
//         };
//         this.fetchFilmsForPage = this.fetchFilmsForPage.bind(this)
//         this.handleFilm = this.handleFilm.bind(this)
//     }
    
//     async componentDidMount() {
//         let fetchFilms = await API.fetchMovies(this.state.page)
//         this.setState({listOfFilms: fetchFilms.results, totalPages: fetchFilms.total_pages, page: fetchFilms.page, loading: false})
//     }

//     async fetchFilmsForPage(page){
//         this.setState({listOfFilms: [], loading: true})
//         let fetchFilmsForPage = await API.fetchMovies(page)
//         this.setState({listOfFilms: fetchFilmsForPage.results, totalPages: fetchFilmsForPage.total_pages, page: fetchFilmsForPage.page, loading: false})
//     }

//     handleFilm(selectedFilm) {
//         this.setState({selectedFilm})
//     }
//     render() {
//         const { listOfFilms, totalPages, page, selectedFilm } = this.state;
//         return (
//             <>
//                 <Pagination
//                     page={page}
//                     totalPages={totalPages}
//                     changePage={this.fetchFilmsForPage}
//                     color={this.props.color}
//                 />
//                 <GridLoader
//                     className="loader"
//                     size={100}
//                     color={this.props.color}
//                     loading={this.state.loading}
//                     speedMultiplier={1.5}
//                     aria-label="Loading Spinner"
//                     data-testid="loader"
//                 />
//                 {
//                     listOfFilms.map(film =>(
//                         <Film key={film.id} {...film} openLink={this.handleFilm} color={this.props.color}/>
//                     ))
//                 }
//                 {selectedFilm && (
//                     <PopUp filmLink={selectedFilm} closePopUp={() => this.handleFilm(null)}/>
//                 )}
//             </>
//         )
//     }
// }

const Content = (props) => {
    const theme = useContext(ThemeContext)
    return (
        <div className="header">
            <ThemedToggleButton onClick={props.toggleTheme} />
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme.theme.foreground}` }}>Favourite Movies</h1>
            <FilmList1
                color={theme.theme.foreground}
            />
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
            <Content toggleTheme={toggleTheme}/>
        </ThemeContext.Provider>
    )
}


// export default class Movies extends Component {
//     constructor(props) {
//         super(props);
//         this.toggleTheme = () => {
//             this.setState(state => ({
//                 theme:
//                     state.theme === themes.dark ? themes.light : themes.dark,
//             }))
//         }

//         this.state = {
//             theme: themes.dark,
//             toggleTheme: this.toggleTheme,
//         }
//     }    
//     render() {

//         document.body.style.backgroundColor = this.state.theme.background

//         class Content extends Component {
//             render() {
//                 return (
//                     <ThemeContext.Consumer>
//                         {({ theme, toggleTheme }) => (
//                             <div className="header">
//                                 <ThemedToggleButton onClick={toggleTheme}/>
//                                 <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme.foreground}` }}>Favourite Movies</h1>
//                                 <FilmList
//                                     color={theme.foreground}
//                                 />
//                             </div>
//                         )}
//                     </ThemeContext.Consumer>
//                 )
//             }
//         }
        
//         return (
//             <ThemeContext.Provider value={this.state}>
//                 <Content/>
//             </ThemeContext.Provider>
//         );
//     }
// }