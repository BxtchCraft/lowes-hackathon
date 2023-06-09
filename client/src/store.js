import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './reducers/imageReducer';
import quoteReducer from './reducers/quoteReducer';

export const store = configureStore({
    reducer: {
        image: imageReducer,
        quote: quoteReducer,
    },
});