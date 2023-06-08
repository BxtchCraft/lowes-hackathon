import React from 'react';
import '../scss/components/Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Camera, CameraResultType } from '@capacitor/camera';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeImageData } from '../actions/actions';

const Modal = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function takePicture() {
        console.log("TAKING PICTURE!");
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        // navigate('/loading', {state: {image}});
        const imageData = image.base64String;

        dispatch(storeImageData(imageData));
        console.log("Navigate to loading...");
        navigate('/loading');
    }

    return (
        <div id="overlay">
            <div className="modal">
                <FontAwesomeIcon icon={icon({name: 'close', family: 'sharp', style: 'regular'})} size="lg" onClick={onClose} />
                <img src="/images/worker.png" />
                <h4>We Want Your Business</h4>
                <p>Upload a copy of your<br />competitive quote or take a<br />photo to see how we compare</p>
                <div className="permission-box">
                    <p>To use these features, please<br />allow camera and photo access</p>
                    <button className="primary" onClick={takePicture}>Allow Access</button>
                    <button className="ghost">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;