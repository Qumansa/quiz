import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Quiz', 'IndexOfCurrentQuestion'],
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: () => `/questions`
        }),
        getQuestion: builder.query({
            query: (id) => `/questions/${id}`
        }),
        getIndexOfCurrentQuestion: builder.query({
            query: () => '/indexOfCurrentQuestion',
            providesTags: ['IndexOfCurrentQuestion']
        }),
        updateIndexOfCurrentQuestion: builder.mutation({
            query: (data) => ({
                url: '/indexOfCurrentQuestion',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['IndexOfCurrentQuestion']
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
    useGetIndexOfCurrentQuestionQuery,
    useUpdateIndexOfCurrentQuestionMutation,
    useGetAmountOfCorrectAnswersQuery,
    useUpdateAmountOfCorrectAnswersMutation
} = quizApi;