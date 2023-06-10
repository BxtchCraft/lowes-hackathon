import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeQuoteData } from "../actions/actions";
import Spinner from "../components/Spinner";
import Tesseract from 'tesseract.js';
import '../scss/pages/Loading.scss';

const LoadingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [recognizedText, setRecognizedText] = useState('Scanning your quote...');
    const image = useSelector(state => state);

    useEffect(() => {
        if(image && recognizedText === 'Scanning your quote...') {
            const imgData = `data:image/jpeg;base64,${image.image.imageData}`;

            Tesseract.recognize(imgData, 'eng')
            .then(({ data: {text} }) => {
                const prompt = `Extract descriptive product keywords from this text: ${text}`;
                fetch('https://hackathon-api-service.onrender.com/api/keywords', {
                    method: 'POST',
                    headers: {'Content-Type': 'text/plain'},
                    body: prompt
                })
                .then(response => response.json())
                .then(keywords => {
                    setRecognizedText('Finding comparables...');
                    fetch('https://hackathon-api-service.onrender.com/api/products')
                    .then(response => response.json())
                    .then(products => {
                        setRecognizedText('Building new quote...');
                        let bodyObject = {
                            keywords: keywords.result,
                            products: products.data
                        };

                        fetch('https://hackathon-api-service.onrender.com/api/match', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(bodyObject)
                        })
                        .then(response => response.json())
                        .then(matches => {
                            dispatch(storeQuoteData(matches));
                            navigate('/quote/6472711');
                        })
                        .catch(error => {
                            console.log('An error occurred while fetching matches API');
                        })
                    })
                    .catch(error => {
                        console.log('An error occurred while fetching products API');
                    })
                })
                .catch(error => {
                    console.log('An error occurred while fetching keywords API');
                });
            }).catch(error => {
                console.log('A Tesseract error occurred');
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