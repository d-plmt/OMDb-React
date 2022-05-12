import { useEffect, useState } from "react";
import "../styles/moviedetails.css";

const MovieDetails = (props: any) => {

    interface Movie {
        Title: string;
        Poster: string;
        Year: number;
        Released: string;
        imdbID: string;
        Genre: string;
        Director: string;
        Writer: string;
        Actors: string;
        Plot: string;
        Language: string;
        Country: string;
        Awards: string;
        imdbRating: number;
        Rated: string;
        BoxOffice: string;
    }

    const [fullMovie, setFullMovie] = useState<Movie>();
    const [imdbID, setID] = useState('');

    useEffect(() => {
        setID(props.imdbID);

        async function search_request() {
            const url = `http://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=65a08a0`

            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson) {
                setFullMovie(responseJson);
            }
        };
        search_request();
    }, [imdbID, fullMovie, props.imdbID]);

    useEffect(() => {
        const empty = {} as Movie;
        return () => {
            setFullMovie(empty);
        }
    }, []);

    if (!fullMovie) {
        return null;
    }


    return (
        <div id="movie-details" >
            <div id="top">
                <span id="rating">OMDb Rating: {fullMovie.imdbRating}<img id="star" alt="" src={'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0naXNvLTg4NTktMSc/Pgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTkuNDgxIDE5LjQ4MSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE5LjQ4MSAxOS40ODEiPgogIDxnPgogICAgPHBhdGggZD0ibTEwLjIwMSwuNzU4bDIuNDc4LDUuODY1IDYuMzQ0LC41NDVjMC40NCwwLjAzOCAwLjYxOSwwLjU4NyAwLjI4NSwwLjg3NmwtNC44MTIsNC4xNjkgMS40NDIsNi4yMDJjMC4xLDAuNDMxLTAuMzY3LDAuNzctMC43NDUsMC41NDFsLTUuNDUyLTMuMjg4LTUuNDUyLDMuMjg4Yy0wLjM3OSwwLjIyOC0wLjg0NS0wLjExMS0wLjc0NS0wLjU0MWwxLjQ0Mi02LjIwMi00LjgxMy00LjE3Yy0wLjMzNC0wLjI4OS0wLjE1Ni0wLjgzOCAwLjI4NS0wLjg3Nmw2LjM0NC0uNTQ1IDIuNDc4LTUuODY0YzAuMTcyLTAuNDA4IDAuNzQ5LTAuNDA4IDAuOTIxLDB6Ii8+CiAgPC9nPgo8L3N2Zz4K'}></img> </span>
                <span id="title">{fullMovie.Title}</span>
            </div>
            <div id="description-wrapper">
                <div id="poster-wrapper"><img id="poster" alt="Poster" src={fullMovie.Poster} /></div>
                <div id="right-side">
                    <div id="plot">{fullMovie.Plot}</div>

                    <span id="label">Genre</span><span id="info">{fullMovie.Genre}</span><br />
                    <span id="label">Language</span><span id="info">{fullMovie.Language}</span><br />
                    <span id="label">Country</span><span id="info">{fullMovie.Country}</span><br />
                    <span id="label">Director</span><span id="info">{fullMovie.Director}</span><br></br>
                    <span id="label">Writer</span><span id="info">{fullMovie.Writer}</span><br />
                    <span id="label">Actors</span><span id="info">{fullMovie.Actors}</span><br></br>
                    <span id="label">Awards</span><span id="info">{fullMovie.Awards}</span><br></br>
                    <span id="label">Box Office</span><span id="info">{fullMovie.BoxOffice}</span><br></br>
                </div>
            </div>

        </div>
    )
}

export default MovieDetails;
