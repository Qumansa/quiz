import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002'
    }),
    tagTypes: ['Quiz'],
    endpoints: (builder) => ({
        getQuestion: builder.query({
            query: (id) => `/questions/${id}`,
            providesTags: ['Quiz']
        }),
    })
});

export const {
    useGetQuestionQuery, 
} = quizApi;