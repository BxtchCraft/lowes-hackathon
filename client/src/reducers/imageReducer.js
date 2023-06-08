const initialState = {
    imageData: null
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_IMAGE_DATA':
            return {
                ...state,
                imageData: action.payload
            };
        default:
            return state;
    }
};

export default imageReducer;