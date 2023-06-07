import React from "react";
import '../scss/components/Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';




function Search() {
    return (
        <section id="header-search">
            <div className="search-container">
                <FontAwesomeIcon icon={icon({name: 'search', family: 'sharp', style: 'solid'})} size="lg" />
                <input type="text" className="search-input" placeholder="Search" />
                <FontAwesomeIcon icon={icon({name: 'camera', style: 'solid', })} size="lg" className="search-icon" />
                <FontAwesomeIcon icon={icon({name: 'barcode-read', family: 'sharp', style: 'regular', })} size="lg" className="search-icon" />
            </div>
            
        </section>
    );
}

export default Search;