import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tesseract from 'tesseract.js';
import '../scss/pages/Loading.scss';
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeQuoteData } from "../actions/actions";

const LoadingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [recognizedText, setRecognizedText] = useState('Scanning your quote...');
    const image = useSelector(state => state);

    useEffect(() => {
        if (image && recognizedText === 'Scanning your quote...') {
            const imgData = `data:image/jpeg;base64,${image.image.imageData}`;

            Tesseract.recognize(
                imgData,
                'eng',
                { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
                // const prompt = `Please extract the item description, model number, SKU number, quantity, and other relevant details from the provided text and return them in a JSON format:\n ${text}`;
                const prompt = `Extract descriptive product keywords from this text: ${text}`;
                fetch('/api/keywords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: prompt
                })
                .then(response => response.json())
                .then(keywords => {
                    setRecognizedText('Finding comparables...');
                    fetch('/api/products')
                        .then(response => response.json())
                        .then(products => {
                            setRecognizedText('Building new quote...');

                            let bodyObject = {
                                keywords: keywords.result,
                                products: products.data
                            };
                            fetch('/api/match', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(bodyObject)
                            }).then(response => response.json())
                            .then(matches => {
                                dispatch(storeQuoteData(matches));
                                navigate('/quote/6472711');
                            }).catch((error) => {
                                console.error('Error:', error);
                            });
                        }).catch(err => console.error('Error:', err));
                }).catch((error) => {
                    console.error('Error:', error);
                });
            }).catch(error => {
                console.error('An error occurred:', error);
                setRecognizedText(error);
            });
        }
    }, [image, recognizedText]);

    return (
        <div className="body">
            <Spinner />
            <p>{recognizedText}</p>
        </div>
    );
};

export default LoadingPage;
