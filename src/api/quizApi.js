import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
	reducerPath: 'quizApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
	}),
	tagTypes: [
		'Quiz',
		'IndexOfCurrentQuestion',
		'IsQuizStarted',
		'IsQuizOver',
		'Difficulties',
		'CurrentDifficulty',
		'Questions',
		'Question',
	],
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: (difficulty) => `/${difficulty}`,
			providesTags: ['Questions'],
		}),
		getQuestion: builder.query({
			query: (url) => `/${url}`,
			providesTags: ['Question'],
		}),
		updateQuestion: builder.mutation({
			query: ({ url, ...data }) => ({
				url: `/${url}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Question', 'Questions'],
		}),
		getDifficulties: builder.query({
			query: () => `/difficulties`,
			providesTags: ['Difficulties'],
		}),
		updateDifficulty: builder.mutation({
			query: (data) => ({
				url: `/difficulties/${data.id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Difficulties'],
		}),
		getCurrentDifficulty: builder.query({
			query: () => `/currentDifficulty`,
			transformResponse: (response) => response.currentDifficulty,
			providesTags: ['CurrentDifficulty'],
		}),
		updateCurrentDifficulty: builder.mutation({
			query: (data) => ({
				url: '/currentDifficulty',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['CurrentDifficulty'],
		}),
		getIndexOfCurrentQuestion: builder.query({
			query: () => '/indexOfCurrentQuestion',
			transformResponse: (response) => response.indexOfCurrentQuestion,
			providesTags: ['IndexOfCurrentQuestion'],
		}),
		updateIndexOfCurrentQuestion: builder.mutation({
			query: (data) => ({
				url: '/indexOfCurrentQuestion',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['IndexOfCurrentQuestion'],
			// invalidatesTags: ['Quiz', 'IndexOfCurrentQuestion', 'IsQuizOver', 'Difficulties', 'CurrentDifficulty', 'Questions', 'Question']
		}),
		getAmountOfCorrectAnswers: builder.query({
			query: () => `/answers`,
			transformResponse: (response) => response.amountOfCorrectAnswers,
			providesTags: ['Quiz'],
		}),
		updateAmountOfCorrectAnswers: builder.mutation({
			query: (data) => ({
				url: '/answers',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Quiz'],
		}),
		getIsQuizOver: builder.query({
			query: () => `/isQuizOver`,
			transformResponse: (response) => response.isQuizOver,
			providesTags: ['IsQuizStarted'],
		}),
		updateIsQuizOver: builder.mutation({
			query: (data) => ({
				url: '/isQuizOver',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['IsQuizStarted'],
		}),
		getIsQuizStarted: builder.query({
			query: () => `/isQuizStarted`,
			transformResponse: (response) => response.isQuizStarted,
			providesTags: ['IsQuizStarted'],
		}),
		updateIsQuizStarted: builder.mutation({
			query: (data) => ({
				url: '/isQuizStarted',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['IsQuizStarted'],
		}),
		getCheckSkipped: builder.query({
			query: () => `/checkSkipped`,
			transformResponse: (response) => response.checkSkipped,
			providesTags: ['CheckSkipped'],
		}),
		updateCheckSkipped: builder.mutation({
			query: (data) => ({
				url: '/CheckSkipped',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['CheckSkipped'],
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetQuestionQuery,
	useUpdateQuestionMutation,
	useGetDifficultiesQuery,
	useUpdateDifficultyMutation,
	useUpdateCurrentDifficultyMutation,
	useGetCurrentDifficultyQuery,
	useGetIndexOfCurrentQuestionQuery,
	useUpdateIndexOfCurrentQuestionMutation,
	useGetAmountOfCorrectAnswersQuery,
	useUpdateAmountOfCorrectAnswersMutation,
	useGetIsQuizStartedQuery,
	useUpdateIsQuizStartedMutation,
	useGetIsQuizOverQuery,
	useUpdateIsQuizOverMutation,
	useGetCheckSkippedQuery,
	useUpdateCheckSkippedMutation,
} = quizApi;
