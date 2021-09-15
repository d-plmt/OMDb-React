import { useEffect, useState } from "react";
import '../styles/searchbar.css';
import searchIcon from '../images/magnifying-glass.svg';
import { useHistory } from "react-router";

const SearchBar = (props: any) => {
    const [userInput, setUserInput] = useState('');
    const history = useHistory();


    const routeChange = (e: any) => {
        if ((e === null) || (e.key === 'Enter')) {
            if (userInput) {
                history.push('/searchid=' + userInput);
                props.setSearch(userInput);
                setUserInput('');
            }
        }

    }

    useEffect(() => {
        return () => {
        }
    }, []);

    return (
        <div className="search-wrapper">
            <div id="input-wrapper"><input id="searchbox" onChange={(event) => setUserInput(event.target.value)} onKeyPress={(e) => routeChange(e)} placeholder="Search OMDb" value={userInput} /></div>
            <button id="glass" type='button' onClick={() => routeChange(null)}><img src={searchIcon} alt="Search" /></button>

        </div >
    )
}

export default SearchBar;