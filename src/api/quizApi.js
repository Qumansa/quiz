import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Quiz', 'IndexOfCurrentQuestion', 'IsQuizOver', 'CurrentDifficulty'],
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: (difficulty) => `/${difficulty}`
        }),
        getQuestion: builder.query({
            query: (url) => `/${url}`
        }),
        getDifficulties: builder.query({
            query: () => `/difficulties`
        }),
        getCurrentDifficulty: builder.query({
            query: () => `/currentDifficulty`,
            transformResponse: (response) => response.currentDifficulty,
            providesTags: ['CurrentDifficulty']
        }),
        updateCurrentDifficulty: builder.mutation({
            query: (data) => ({
                url: '/currentDifficulty',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['CurrentDifficulty']
        }),
        getIndexOfCurrentQuestion: builder.query({
            query: () => '/indexOfCurrentQuestion',
            transformResponse: (response) => response.indexOfCurrentQuestion,
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
            transformResponse: (response) => response.amountOfCorrectAnswers,
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
        getIsQuizOver: builder.query({
            query: () => `/isQuizOver`,
            transformResponse: (response) => response.isQuizOver,
            providesTags: ['IsQuizOver']
        }),
        updateIsQuizOver: builder.mutation({
            query: (data) => ({
                url: '/isQuizOver',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['IsQuizOver']
        }),
    })
});

export const {
    useGetQuestionsQuery,
    useGetQuestionQuery, 
    useGetDifficultiesQuery,
    useUpdateCurrentDifficultyMutation,
    useGetCurrentDifficultyQuery,
    useGetIndexOfCurrentQuestionQuery,
    useUpdateIndexOfCurrentQuestionMutation,
    useGetAmountOfCorrectAnswersQuery,
    useUpdateAmountOfCorrectAnswersMutation,
    useGetIsQuizOverQuery,
    useUpdateIsQuizOverMutation
} = quizApi;