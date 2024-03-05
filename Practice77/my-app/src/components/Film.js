import { RateSwitch } from "./RateSwitch.js";

export const Film = ({ title, overview, poster_path, popularity, openLink, release_date, color, children }) => {
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
