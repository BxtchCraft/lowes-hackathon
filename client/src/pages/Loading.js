import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tesseract from 'tesseract.js';
import '../scss/pages/Loading.scss';
import Spinner from "../components/Spinner";

const LoadingPage = () => {
    console.log("Begin Loading...");
    const [recognizedText, setRecognizedText] = useState('Scanning your quote...');
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
                setRecognizedText('Finding comparables...');
                const prompt = `Please extract the item description, model number, SKU number, quantity, and other relevant details from the provided text and return them in a JSON format:\n ${text}`;
                console.log(prompt);
                fetch('/api/prompt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: prompt
                }).then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error:', error);
                });
            }).catch(error => {
                console.error('An error occurred:', error);
                setRecognizedText(error);
            });
        }
    }, [image]);

    return (
        <div className="body">
            <Spinner />
            <p>{recognizedText}</p>
        </div>
    );
};

export default LoadingPage;
