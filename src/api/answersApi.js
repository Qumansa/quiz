import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const answersApi = createApi({
    reducerPath: 'answersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    // tagTypes: ['Answers'],
    endpoints: (builder) => ({
        getAmountOfCorrectAnswers: builder.query({
            query: () => `/answers`,
            // providesTags: ['Quiz']
        }),
    })
});

export const {
    useGetAmountOfCorrectAnswersQuery, 
} = answersApi;