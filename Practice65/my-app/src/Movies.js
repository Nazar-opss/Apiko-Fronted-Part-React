import React, { Component } from "react";
import RateSwitch from "./RateSwitch.js";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        fetch(
            "https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
            {
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU0NDAzOWUyZjcyNzE2MDQ1MjI0MTYyNTUzMjVhZiIsInN1YiI6IjY1MmQ1NTg4MDI0ZWM4MDEzYzU4ZWE2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWvRwpk_xlSh71byPoa1qFKZCmbgDyEUOxl3jrZ7puY",
                },
            }
        )
            .then((response) => response.json())
            .then((json) => this.setState({ array: json.results }));
    }
    render() {
        const { array } = this.state;
        console.log(array);
        const imagePath = "https://image.tmdb.org/t/p/w300";

        const films = array.map((item) => {
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
            </>
        );
    }
}
