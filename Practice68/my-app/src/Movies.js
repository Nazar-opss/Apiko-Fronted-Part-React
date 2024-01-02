import React, { Component } from "react";
import RateSwitch from "./RateSwitch.js";
import Pagination from "./Pagination.js";
import { ThemedToggleButton } from "./ThemedButton.js";
import API from "./Api.js";
import { ThemeContext } from "./ThemedButton.js";
import { themes } from "./const.js";
import GridLoader from "react-spinners/GridLoader"


class FilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMovies: [],
            totalPages: 1,
            page: 1,
            loading: true
        };
        this.fetchFilmsForPage = this.fetchFilmsForPage.bind(this)
    }
    

    async componentDidMount() {
        let fetchFilms = await API.fetchMovies(this.state.page)
        this.setState({listOfMovies: fetchFilms.results, totalPages: fetchFilms.total_pages, page: fetchFilms.page})
        this.setState({loading: false})
    }

    async fetchFilmsForPage(page){
        this.setState({loading: true})
        let fetchFilmsForPage = await API.fetchMovies(page)
        this.setState({listOfMovies: fetchFilmsForPage.results, totalPages: fetchFilmsForPage.total_pages, page: fetchFilmsForPage.page})
        this.setState({loading: false})
    }
    
    render() {
        const { listOfMovies, totalPages, page } = this.state;
        // console.log(listOfMovies)

        const imagePath = "https://image.tmdb.org/t/p/w300";

        const films = listOfMovies.map((item) => {
            const { title, overview, poster_path, popularity } = item;
            return (
                <div className="films" key={item.id}>
                    <h2 style={{ color: `${this.props.color}` }}>{title}</h2>
                    <img src={imagePath + poster_path} alt=""></img>
                    <p style={{ color: `${this.props.color}` }}>{overview}</p>
                    <RateSwitch popularity={popularity} color={this.props.color} />
                    <hr className="solid"></hr>
                </div>
            )
        });
        return (
            <>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    changePage={this.fetchFilmsForPage}
                    color={this.props.color}
                />
                <GridLoader
                    className="loader"
                    size={100}
                    color={this.props.color}
                    loading={this.state.loading}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                {films}
            </>
        )
    }
}

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark ? themes.light : themes.dark,
            }))
        }
        this.state = {
            theme: themes.dark,
            toggleTheme: this.toggleTheme,
        };
    }

    // async componentDidMount() {
    //     let fetchFilms = await API.fetchMovies(this.state.page)
    //     this.setState({listOfMovies: fetchFilms.results, totalPages: fetchFilms.total_pages, page: fetchFilms.page})
    // }

    // async fetchFilmsForPage(page){
    //     let fetchFilmsForPage = await API.fetchMovies(page)
    //     this.setState({listOfMovies: fetchFilmsForPage.results, totalPages: fetchFilmsForPage.total_pages, page: fetchFilmsForPage.page})
    // }
    
    render() {
        // const { listOfMovies, totalPages, page } = this.state;
        // // console.log(listOfMovies)
        
        // const imagePath = "https://image.tmdb.org/t/p/w300";
        
        // const films = listOfMovies.map((item) => {
        //     const { title, overview, poster_path, popularity } = item;
        //     return (
        //         <div className="films" key={item.id}>
        //             <h2>{title}</h2>
        //             <img src={imagePath + poster_path} alt=""></img>
        //             <p>{overview}</p>
        //             <RateSwitch popularity={popularity}/>
        //             <hr className="solid"></hr>
        //         </div>
        //     )
        // });
        
        
        class Content extends Component {
            render() {
                return (
                    <ThemeContext.Consumer>
                        {({ theme, toggleTheme }) => (
                            <div className="header" style={{backgroundColor: `${theme.background}`}}>
                                <ThemedToggleButton onClick={toggleTheme}/>
                                <h1 onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: `${theme.foreground}`  }}>Favourite Movies</h1>
                                {/* зробити ворк через кнопку */}
                                <FilmList
                                    color={theme.foreground}
                                />
                                {/* {films} */}
                            </div>
                        )}
                    </ThemeContext.Consumer>
                )
            }
        }
        
        return (
            // <div className="header">
            //     <h1 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Favourite Movies <ThemedButton/></h1>
            //     <Pagination
            //     page={page}
            //     totalPages={totalPages}
            //     changePage={this.fetchFilmsForPage}
            //     />
            //     {films}
            // </div>
            <ThemeContext.Provider value={this.state}>
                <Content/>
            </ThemeContext.Provider>
        );
    }
}

