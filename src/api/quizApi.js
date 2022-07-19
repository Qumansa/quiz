import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Quiz'],
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: () => `/questions`
        }),
        getQuestion: builder.query({
            query: (id) => `/questions/${id}`
        }),
        getAmountOfCorrectAnswers: builder.query({
            query: () => `/answers`,
            providesTags: ['Quiz']
        }),
        updateAmountOfCorrectAnswers: builder.mutation({
            query: (data) => ({
                url: '/answers',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Quiz']
        }),
    })
});

export const {
    useGetQuestionsQuery,
    useGetQuestionQuery, 
    useGetAmountOfCorrectAnswersQuery,
    useUpdateAmountOfCorrectAnswersMutation
} = quizApi;