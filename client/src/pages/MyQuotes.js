import React, { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import '../scss/pages/MyQuotes.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const MyQuotesPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Header />
            <section id="location">
                <div>
                    <FontAwesomeIcon icon={icon({name: 'location-dot', family: 'sharp', style: 'regular'})} size="lg" />
                </div>
                <div>
                    <p className="interactive">Central Charlotte Lowe's<br />
                    <span className="subtext">Open Until 9 PM</span></p>
                </div>
                <div>
                    <FontAwesomeIcon icon={icon({name: 'chevron-right', family: 'sharp', style: 'regular'})} size="md" />
                </div>
            </section>

            <section className="breadcrumbs">
                <p><span className="parent">Account Dashboard</span> <span className="separator">/</span> <span className="current">My Quotes</span></p>
            </section>
            
            <section className="title">
                <h1>My Quotes</h1>
            </section>

            <section className="buttons">
                <button className="primary"><FontAwesomeIcon icon={icon({name: 'plus', family: 'sharp', style: 'regular'})} size="md" /> Create a New Quote</button>
                <button onClick={handleOpenModal} className="secondary"><FontAwesomeIcon icon={icon({name: 'plus', family: 'sharp', style: 'regular'})} size="md" /> Create a New Competitive Quote</button>
            </section>

            <section className="empty">
                <h3>No Saved Quotes</h3>
                <p>You don't have any saved quotes.<br />Create a new quote or begin by adding items to your<br /> cart and saving it as a quote.</p>
            </section>

            {showModal && <Modal onClose={handleCloseModal} />}
        </div>
    )
};

export default MyQuotesPage;