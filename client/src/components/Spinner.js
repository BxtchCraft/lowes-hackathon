import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Spinner = () => {
    return (
        <div className="spinner">
            <FontAwesomeIcon icon={icon({name: 'spinner-third', family: 'sharp', style: 'regular'})} size="2xl" spin />
        </div>
    );
};

export default Spinner;