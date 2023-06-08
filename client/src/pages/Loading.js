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
                const regex = /(\d{18})\s+(.*?)\s+/g;
                const matches = [];
                let match;

                while((match = regex.exec(text))) {
                    const sku = match[1];
                    const description = match[2];
                    matches.push({sku, description});
                }

                console.log(matches);
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
