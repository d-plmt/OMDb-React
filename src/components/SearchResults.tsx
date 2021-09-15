import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/searchresults.css';

const SearchResults = (props: any) => {

    interface Movie {
        Title: string;
        Poster: string;
        Year: string;
        imdbID: string;
    }

    const [results, setResults] = useState([]);
    const [titleSearch, setTitleSearch] = useState('');
    const history = useHistory();

    const sortAlphabetically = () => {
        setResults(results.slice().sort((a: any, b: any) => {
            return ((a.Title).localeCompare(b.Title));
        }));
    }

    const sortByYear = () => {
        setResults(results.slice().sort((a: any, b: any) => {

            return ((a.Year).localeCompare(b.Year));
        }))
    }

    const routeChange = (ID: string) => {
        props.setID(ID);
        history.push('/movieid=' + ID);
    }

    useEffect(() => {
        setResults(props.movies);
        setTitleSearch(props.titleSearch);
    }, [props]);

    useEffect(() => {
        return () => {
            setResults([]);
            setTitleSearch('');
        }
    }, []);

    return (
        <div className="results-container">
            <h1>Search Results for "{titleSearch}"</h1>
            {results.length ? (
                <div>
                    <div id="sorting_container">
                        <button className="button" id="AZ_sort" onClick={() => sortAlphabetically()}>Sort Alphabetically (A-Z)</button>
                        <button className="button" id="Year_sort" onClick={() => sortByYear()}>Sort by Date (Oldest-Newest)</button>
                        <span id="clearer"></span>
                    </div>
                    <div id="movies">
                        {results.map((result: Movie, index: number) => <div id={result.imdbID} key={result.imdbID}>
                            <div id="movie_container">
                                <button className="button" id="movie_header" onClick={() => routeChange(result.imdbID)}>
                                    <span id="title">
                                        {result.Title}&nbsp;({result.Year})

                                    </span>

                                    <span id="clearer"></span>
                                </button>
                                <button className="button" id="content-wrapper" onClick={() => routeChange(result.imdbID)}>
                                    <img id="poster" alt="Poster" src={result.Poster}></img>

                                </button>
                            </div>
                        </div>)}
                    </div>
                </div>
            ) : (<div>No results found for "{titleSearch}"</div>)}
        </div>

    )
}

export default SearchResults;