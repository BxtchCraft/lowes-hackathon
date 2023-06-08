import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tesseract from 'tesseract.js';

const LoadingPage = () => {
    console.log("Begin Loading...");
    const [recognizedText, setRecognizedText] = useState('Loading...');
    const image = useSelector(state => state);

    useEffect(() => {
        console.log("Begin useEffect...");
        if (image) {
            const imgData = `data:image/jpeg;base64,${image.image.imageData}`;

            Tesseract.recognize(
                imgData,
                'eng',
                { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
                console.log("FETCHING!");
                fetch('/api/hello')
                .then(response => response.json())
                .then(data => console.log(data));
                setRecognizedText(text);
            }).catch(error => {
                console.error('An error occurred:', error);
                setRecognizedText(error);
            });
        }
    }, [image]);

    return (
        <div>
            <h1>Loading Page</h1>
            <p>{recognizedText}</p>
        </div>
    );
};

export default LoadingPage;
