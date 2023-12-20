class API {
    async fetchMovies(page){
        let data = await fetch(
            `https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
            {
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU0NDAzOWUyZjcyNzE2MDQ1MjI0MTYyNTUzMjVhZiIsInN1YiI6IjY1MmQ1NTg4MDI0ZWM4MDEzYzU4ZWE2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWvRwpk_xlSh71byPoa1qFKZCmbgDyEUOxl3jrZ7puY",
                },
            }
        )
        const films = await data.json();
        console.log(films)
        return films;
    }
}
export default new API;