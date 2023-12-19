import React, { Component } from "react";
import RateSwitch from "./RateSwitch.js";
import Pagination from "./Pagination.js";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMovies: [],
            totalPages: 1,
            page: 1
        };
    }

    componentDidMount() {
        fetch(
            `https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=${this.state.page}&sort_by=created_at.asc`,
            {
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU0NDAzOWUyZjcyNzE2MDQ1MjI0MTYyNTUzMjVhZiIsInN1YiI6IjY1MmQ1NTg4MDI0ZWM4MDEzYzU4ZWE2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWvRwpk_xlSh71byPoa1qFKZCmbgDyEUOxl3jrZ7puY",
                },
            }
        )
            .then((response) => response.json())
            .then((json) => this.setState({ listOfMovies: json.results, totalPages: json.total_pages, page: json.page }));
    }
    render() {
        const { listOfMovies, totalPages, page } = this.state;
        console.log(listOfMovies)
        
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
            <>
                <h1>Favourite Movies</h1>
                {films}
                <Pagination
                page={page}
                totalPages={totalPages}
                />
            </>
        );
    }
}
