import { configureStore } from '@reduxjs/toolkit'
import productTagsReducer from '../slices/product-tags.slice';
import userReducer from '../slices/user.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        productTags: productTagsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
