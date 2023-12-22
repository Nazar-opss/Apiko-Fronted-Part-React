import React, { Component } from "react";
import RateSwitch from "./RateSwitch.js";
import Pagination from "./Pagination.js";
import ThemedButton from "./ThemedButton.js";
import API from "./Api.js";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMovies: [],
            totalPages: 1,
            page: 1
        };
        this.fetchFilmsForPage = this.fetchFilmsForPage.bind(this)
    }

    async componentDidMount() {
        let fetchFilms = await API.fetchMovies(this.state.page)
        this.setState({listOfMovies: fetchFilms.results, totalPages: fetchFilms.total_pages, page: fetchFilms.page})
    }

    async fetchFilmsForPage(page){
        let fetchFilmsForPage = await API.fetchMovies(page)
        this.setState({listOfMovies: fetchFilmsForPage.results, totalPages: fetchFilmsForPage.total_pages, page: fetchFilmsForPage.page})
    }
    
    render() {
        const { listOfMovies, totalPages, page } = this.state;
        // console.log(listOfMovies)
        
        const imagePath = "https://image.tmdb.org/t/p/w300";
        
        const films = listOfMovies.map((item) => {
            const { title, overview, poster_path, popularity } = item;
            return (
                <div className="films" key={item.id}>
                    <h2>{title}</h2>
                    <img src={imagePath + poster_path} alt=""></img>
                    <p>{overview}</p>
                    <RateSwitch popularity={popularity}/>
                    <hr className="solid"></hr>
                </div>
            )
        });

        return (
            <div className="header">
                <ThemedButton/>
                <h1>Favourite Movies</h1>
                <Pagination
                page={page}
                totalPages={totalPages}
                changePage={this.fetchFilmsForPage}
                />
                {films}
            </div>
        );
    }
}
