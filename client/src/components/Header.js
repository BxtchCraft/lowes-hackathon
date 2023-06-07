import React from "react";
import '../scss/components/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';




function Header() {
    return (
        <header>
            <FontAwesomeIcon icon={icon({name: 'bars', family: 'sharp', style: 'solid'})} size="lg" />
            <img class="logo" src="/images/lowes-pro-logo.svg" />
            <FontAwesomeIcon icon={icon({name: 'circle-user', style: 'regular'})} size="lg" />
            <FontAwesomeIcon icon={icon({name: 'cart-shopping', style: 'regular', })} size="lg" />
        </header>
    );
}

export default Header;