import { configureStore } from '@reduxjs/toolkit';

import { quizApi } from '../api/quizApi';

const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(
            quizApi.middleware, 
        );
    },
    devTools: process.env.NODE_ENV !== 'production', 
});

export default store;