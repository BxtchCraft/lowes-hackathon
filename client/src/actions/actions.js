export const storeImageData = (imageData) => {
    return {
        type: 'STORE_IMAGE_DATA',
        payload: imageData
    };
};

export const storeQuoteData = (quoteData) => {
    return {
        type: 'STORE_QUOTE_DATA',
        payload: quoteData
    };
};