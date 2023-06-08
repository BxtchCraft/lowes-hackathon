import React from 'react';
import '../scss/components/Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Modal = ({ onClose }) => {
    return (
        <div id="overlay">
            <div className="modal">
                <FontAwesomeIcon icon={icon({name: 'close', family: 'sharp', style: 'regular'})} size="lg" onClick={onClose} />
                <img src="/images/worker.png" />
                <h4>We Want Your Business</h4>
                <p>Upload a copy of your<br />competitive quote or take a<br />photo to see how we compare</p>
                <div className="permission-box">
                    <p>To use these features, please<br />allow camera and photo access</p>
                    <button className="primary">Allow Access</button>
                    <button className="ghost">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;