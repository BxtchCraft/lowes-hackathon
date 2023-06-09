const initialState = {
    quoteData: null
};

const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_QUOTE_DATA':
            return {
                ...state,
                quoteData: action.payload
            };
        default:
            return state;
    }
};

export default quoteReducer;