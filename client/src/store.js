import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './reducers/imageReducer';

export const store = configureStore({
    reducer: {
        image: imageReducer
    },
});