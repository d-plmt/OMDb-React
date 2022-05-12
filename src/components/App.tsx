import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchBar from './SearchBar';

import './../styles/app.css';
import './../styles/banner.css'
import Homepage from './Homepage';
import SearchResults from './SearchResults';
import MovieDetails from './MovieDetails';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [imdbID, setID] = useState('');

  function switchTheme(e: any) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  function obliterateDupes(arr: any, key: string) {
    var newArray = [];
    var obj: any = {};

    for (var i in arr) {
      obj[arr[i][key]] = arr[i];
    }

    for (i in obj) {
      newArray.push(obj[i]);
    }
    return newArray;
  }

  useEffect(() => {
    const search_request = async () => {
      setMovies([]);
      const url = `http://www.omdbapi.com/?s=${titleSearch}&apikey=65a08a0`

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {              //OMDb sometimes has duplicates
        let response = responseJson.Search;
        let movies: any = obliterateDupes(response, "imdbID");
        setMovies(movies);
      } else {
        setMovies([]);
      }
    };
    search_request();
  }, [titleSearch]);


  useEffect(() => {
    return () => {
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Router>
        <div className="banner">
          <Link to="/" className="banner-link"><div className="title_container">OMDb</div></Link>
          <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" onClick={(e) => switchTheme(e)} />
              <div className="slider round"></div>
            </label>
          </div>

        </div>
        <div className="search-container"><SearchBar titleSearch={titleSearch} setSearch={setTitleSearch} /></div>
        <div className="content">
          <Route exact path="/" component={Homepage} />
          <Route path="/searchid=:userInput"><SearchResults movies={movies} titleSearch={titleSearch} setID={setID} /></Route>
          <Route path="/movieID=:imdbID"><MovieDetails imdbID={imdbID} /></Route>
        </div>
      </Router>
    </div>

  );
}

export default App;
