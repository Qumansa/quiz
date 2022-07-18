import { configureStore } from '@reduxjs/toolkit';

import { quizApi } from '../api/quizApi';
import { answersApi } from '../api/answersApi';

const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer,
        [answersApi.reducerPath]: answersApi.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(
            quizApi.middleware, 
            answersApi.middleware, 
        );
    },
    devTools: process.env.NODE_ENV !== 'production', 
});

export default store;