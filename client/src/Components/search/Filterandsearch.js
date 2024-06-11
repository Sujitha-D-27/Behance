import { useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import './filter.css';

const Filterandsearch = ({ toggleSidebar, setToggleSidebar, setSortOption }) => {
    const suggestions = [
        'Design', 'Photography', 'Illustration', 'Art', 'Technology', 'Digital Art', 'Graphic Design',
        'Web Development', 'Mobile App Development', 'Animation', 'Film & Video', 'Music', 'Writing & Blogging',
        'Fashion Design', 'Interior Design', 'Architecture', 'Product Design', 'UX/UI Design', 'Game Design',
    ];

    const sortOptions = ['Recommended',  'Most Viewed', 'Most Liked'];    
    const [title, setTitle] = useState(sortOptions[0]);
    const [searchValue, setSearchValue] = useState('');
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    const handleClick = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    };

    window.onclick = (event) => {
        if (!event.target.matches('.dropbtn')) {
            document.getElementById("myDropdown").classList.remove("show");
        }
    };

    const handleSidebar = () => {
        setToggleSidebar(!toggleSidebar);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setSuggestionsVisible(value.trim() !== '');
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchValue(suggestion);
        setSuggestionsVisible(false);
    };

    const handleSortOptionClick = (option) => {
        setTitle(option);
        setSortOption(option);  // Notify the parent component about the selected sort option
        document.getElementById("myDropdown").classList.remove("show");
    };

    return (
        <div className={toggleSidebar ? "filter-search-toggle" : "filter-search"}>
            {/* {!toggleSidebar && (
                <div className="filter-btn" onClick={handleSidebar}>
                    <TuneIcon fontSize="small" /><button className="filter">Filter</button>
                </div> 
            )} */}   
            <div className="search">
                <div className="search-bar">
                    <SearchIcon /><input type="text" placeholder="Search the Creative World at work" value={searchValue} onChange={handleSearchChange}></input>
                    {suggestionsVisible && (
                        <div className="autocomplete">
                            {suggestions
                                .filter(suggestion => suggestion.toLowerCase().includes(searchValue.toLowerCase()))
                                .map((suggestion, index) => (
                                    <div key={index} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="sort">
                <h3>Sort</h3>
                <button onClick={handleClick} className="dropbtn">{title}<ArrowDropDownIcon fontSize="small" /></button>
                <div id="myDropdown" className="dropdown-content">
                    {sortOptions.map((option, index) => (
                        <a key={index} onClick={() => handleSortOptionClick(option)}>{option}</a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filterandsearch;

