import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../scss/pages/CompetitiveQuote.scss';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const CompetitiveQuotePage = () => {
    const qty = 379;
    const item_ids = useSelector(state => state.quote);
    let [products, setProducts] = useState([]);

    useEffect(() => {
        let id_string = item_ids.quoteData;
        let id_array;

        if (typeof id_string === 'string') {
            // Perform replace operation here
            id_string = id_string.replace('Answer: ', '');
            id_array = JSON.parse(id_string);
        } else {
            console.error(`Expected a string but got ${typeof id_string}`);
        }

        if (id_array && id_array.length > 0) {
            // Fetch each product data
            const fetchProducts = async () => {
                const allProducts = await Promise.all(id_array.map(async id => {
                    const response = await fetch(`/api/product/${id}`);
                    const product = await response.json();
                    return product;
                }));
                setProducts(allProducts);
            }
            fetchProducts();
            
        }
    }, [item_ids]);

    return (
        <div>
            <Header />
            <section className="title">
                <h1>Review Item Matches</h1>
            </section>
            {console.log("Products", products)}
            {products.map((product, index) => (
                <section className="card">
                    <img src={'/images/products/' + product.item.item_number + '.jpg'} />
                    <div className="productData">
                        <h4>{product.item.product}</h4>
                        <p className="itemInfo"><small>Item #{product.item.item_number}<br />Model #{product.item.model_number}</small></p>
                        <div className="quantitySelector">
                            <div className="minus"><FontAwesomeIcon icon={icon({name: 'minus', family: 'sharp', style: 'regular'})} size="lg" /></div>
                            <div className="qtyBox">{qty}</div>
                            <div className="plus"><FontAwesomeIcon icon={icon({name: 'plus', family: 'sharp', style: 'regular'})} size="lg" /></div>
                        </div>
                        <p className="unitPrice">{product.item.price}/ea</p>
                        <button className="primary">Confirm</button>
                        <button className="secondary">Not Accurate</button>
                    </div>
                </section>
                // <p key={index}>Item ID #{index+1}: {product.item.item_number}</p>
            ))}

            <section className="orderSummary">
                <h3>Order Summary</h3>
                <hr />
                <div className="row"><p>Item subtotal ({qty})</p><p>$30,729.32</p></div>
                <div className="row"><p>Estimated Savings</p><p>-$4,612.43</p></div>
                <div className="row"><p>Estimated Tax </p><p class="red">Calculated in Checkout</p></div>
                <hr />
                <div className="row"><p><strong>Estimated Total</strong></p><p><strong>$28,009.49</strong></p></div>
            </section>

            <section className="cta">
                <button className="secondary"><FontAwesomeIcon icon={icon({name: 'lock', family: 'sharp', style: 'regular'})} size="lg" /> Start Secure Checkout</button>
                <button className="primary">Submit for Competitive Quote</button>
                <small>Your quote may qualify for volume savings but needs to be reviewed by our quoting team. It will be returned within 24 hours with applicable discounts.</small>
            </section>
        </div>
    )
};

export default CompetitiveQuotePage;
