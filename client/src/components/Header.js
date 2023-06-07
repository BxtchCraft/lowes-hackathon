import React from "react";
import '../scss/components/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import Search from "./Search";




function Header() {
    return (
        <header>
            <section id="top">
                <div><FontAwesomeIcon icon={icon({name: 'bars', family: 'sharp', style: 'solid'})} size="xl" /></div>
                <div><img className="logo" src="/images/lowes-pro-logo.svg" /></div>
                <div>
                    <FontAwesomeIcon icon={icon({name: 'circle-user', style: 'regular'})} size="xl" className="header-icon" />
                    <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'regular', })} size="xl" className="header-icon" />
                </div>
            </section>
            <section id="bottom">
                <Search />
            </section>
        </header>
    );
}

export default Header;