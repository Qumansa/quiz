import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; 

import { 
    useGetQuestionsQuery,
    useGetQuestionQuery, 
    useUpdateQuestionMutation,
    useGetCurrentDifficultyQuery,
    useGetIndexOfCurrentQuestionQuery,
    useUpdateIndexOfCurrentQuestionMutation,
    useGetAmountOfCorrectAnswersQuery,
    useUpdateAmountOfCorrectAnswersMutation,
    useGetIsQuizOverQuery,
    useUpdateIsQuizOverMutation,
    useGetCheckSkippedQuery,
    useUpdateCheckSkippedMutation
} from '../../api/quizApi';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Result from '../result/Result';

import transformCurrentDifficulty from '../utils/transformCurrentDifficulty';
import reload from '../utils/reload';

import './quiz.sass';

const Quiz = () => {
    const {data: isQuizOver = false} = useGetIsQuizOverQuery();

    let {data: currentDifficulty} = useGetCurrentDifficultyQuery();
    currentDifficulty = transformCurrentDifficulty(currentDifficulty);

    const {data: questions = []} = useGetQuestionsQuery(currentDifficulty);
    const totalAmountOfQuestions = questions.length;
    
    const {data: amountOfCorrectAnswers = '-'} = useGetAmountOfCorrectAnswersQuery();
    const {data: indexOfCurrentQuestion = 1} = useGetIndexOfCurrentQuestionQuery();
    
    const {
        data: questionData = {},
        isLoading,
        isFetching,
        isError,
    } = useGetQuestionQuery(`${currentDifficulty}/${indexOfCurrentQuestion}`);

    const {indexNumber = '-', description, answers, correctAnswer, skipped} = isFetching || isError
        ? {}
        : questionData;

    const {
        data: checkSkippedData,
        isSuccess: isCheckSkippedDataSuccess
    } = useGetCheckSkippedQuery();

    const checkSkipped = isCheckSkippedDataSuccess ? checkSkippedData : null;

    const [updateAmountOfCorrectAnswers] = useUpdateAmountOfCorrectAnswersMutation();
    const [updateIsQuizOver] = useUpdateIsQuizOverMutation();
    const [updateIndexOfCurrentQuestion] = useUpdateIndexOfCurrentQuestionMutation();
    const [updateQuestion] = useUpdateQuestionMutation();
    const [updateCheckSkipped] =  useUpdateCheckSkippedMutation();

    console.log(`
        Индекс текущего вопроса: ${indexOfCurrentQuestion}
        Skipped: ${skipped}
        CheckSkipped: ${checkSkipped}
    `);

    useEffect(() => {
        if (checkSkipped && skipped === false) {
            if (indexOfCurrentQuestion === totalAmountOfQuestions) {
                if (questions.every(question => !question.skipped)) {
                    updateIsQuizOver({
                        isQuizOver: true
                    });
                } else {
                    updateIndexOfCurrentQuestion({
                        indexOfCurrentQuestion: 1
                    });
                }
            } else {
                console.log(`На текущий вопрос №${indexOfCurrentQuestion} уже был дан ответ. Переходим к следующему`)
                updateIndexOfCurrentQuestion({
                    indexOfCurrentQuestion: indexOfCurrentQuestion + 1
                });
            }
        }
    }, [indexOfCurrentQuestion, checkSkipped, skipped, totalAmountOfQuestions, updateIndexOfCurrentQuestion, updateIsQuizOver, questions]);

    const onSkip = (e) => {
        e.preventDefault();
        
        updateQuestion({
            url: `${currentDifficulty}/${indexOfCurrentQuestion}`,
            skipped: true
        });

        if (indexOfCurrentQuestion !== totalAmountOfQuestions) {
            updateIndexOfCurrentQuestion({
                indexOfCurrentQuestion: indexOfCurrentQuestion + 1
            });
        } else {
            updateIndexOfCurrentQuestion({
                indexOfCurrentQuestion: 1
            });

            updateCheckSkipped({
                checkSkipped: true
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        updateQuestion({
            url: `${currentDifficulty}/${indexOfCurrentQuestion}`,
            skipped: false
        });

        if (e.target.answer.value === correctAnswer) {
            updateAmountOfCorrectAnswers({
                amountOfCorrectAnswers: amountOfCorrectAnswers + 1
            });
        };

        if (indexOfCurrentQuestion === totalAmountOfQuestions) {
            if (questions.some(question => question.skipped === true)) {
                updateIndexOfCurrentQuestion({
                    indexOfCurrentQuestion: 1
                });

                updateCheckSkipped({
                    checkSkipped: true
                });
            } else {
                updateIsQuizOver({
                    isQuizOver: true
                });
            }
        } else {
            updateIndexOfCurrentQuestion({
                indexOfCurrentQuestion: indexOfCurrentQuestion + 1,
            });
        }
    };

    const UI = () => {
        const descriptionView = isFetching 
            ? <Spinner/> 
            : isError
            ? <ErrorMessage/>
            : <p className="question__descr">{description}</p>;

        const getAnswersView = (arr = ['-', '-', '-', '-']) => {
            return arr.map((answer, index) => {
                return (
                    <li 
                        className="answers__item"
                        key={index}>
                        <input 
                            id={`answer${index}`}
                            className="answers__radio sr-only"
                            type="radio"
                            name="answer"
                            value={answer}
                            required/>
                        <label 
                            className="answers__descr" 
                            htmlFor={`answer${index}`}>
                            {isFetching 
                                ? "Загрузка..." 
                                : isError
                                ? <ErrorMessage/>
                                : answer}
                        </label>
                    </li>
                );
            });
        };

        const answersView = getAnswersView(answers);

        const buttonsView = isLoading 
            ? <Spinner/>  
            : isError 
            ? 
                <>
                    <li className="answers__buttons-item">
                        <button 
                            className="button"
                            onClick={reload}>
                            Перезагрузить
                        </button>
                    </li>
                </>
            : 
                <>
                    <li className="answers__buttons-item">
                        <button 
                            className="button"
                            disabled={isFetching ? 'disabled' : false}
                            onClick={onSkip}>
                            Пропустить
                        </button>
                    </li>
                    <li className="answers__buttons-item">
                        <button 
                            className="button"
                            disabled={isFetching ? 'disabled' : false}>
                            Ответить
                        </button>
                    </li>
                </>;

        return (
            <section className="section section_first">
                <div className="container">
                    <h1 className="sr-only">Викторина</h1>
                    <div className="question__counter">
                        <svg className="question__icon" viewBox="-1 0 18 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4829 5.28193L10.6864 4.59758L8.54222 0.330127C8.48365 0.213287 8.38731 0.118702 8.26829 0.0612089C7.96981 -0.0834504 7.6071 0.037099 7.45786 0.330127L5.3137 4.59758L0.517213 5.28193C0.384974 5.30047 0.26407 5.36167 0.171503 5.45441C0.0595945 5.56733 -0.0020722 5.71924 5.31712e-05 5.87678C0.00217854 6.03431 0.0679221 6.18457 0.182838 6.29454L3.65316 9.61614L2.83328 14.3064C2.81405 14.4156 2.82635 14.5278 2.86878 14.6304C2.91121 14.733 2.98207 14.8218 3.07333 14.8869C3.16459 14.952 3.27259 14.9906 3.38509 14.9985C3.4976 15.0064 3.6101 14.9831 3.70983 14.9314L8.00004 12.717L12.2902 14.9314C12.4074 14.9926 12.5434 15.013 12.6737 14.9908C13.0024 14.9352 13.2235 14.6291 13.1668 14.3064L12.3469 9.61614L15.8172 6.29454C15.9117 6.20367 15.974 6.08497 15.9929 5.95515C16.0439 5.63059 15.8135 5.33015 15.4829 5.28193Z" fill="white"></path>
                        </svg>
                        <span className="question__text">
                            Вопрос <span className="question__number">{indexNumber}</span>/{totalAmountOfQuestions}
                        </span>
                        Количество правильных ответов: {amountOfCorrectAnswers}
                    </div>
                    {descriptionView}
                    <form 
                        className="answers"
                        onSubmit={onSubmit}>
                        <ul className="answers__list">
                            {answersView}
                        </ul>
                        <ul className="answers__buttons">
                            <li className="answers__buttons-item">
                                <Link 
                                    className="button" 
                                    to="/">
                                    На главную
                                </Link>
                            </li>
                            {buttonsView}
                        </ul>
                    </form>
                </div>
            </section>
        );
    };

    return isQuizOver 
        ? <Result
            amountOfCorrectAnswers={amountOfCorrectAnswers}
            totalAmountOfQuestions={totalAmountOfQuestions}
            updateAmountOfCorrectAnswers={updateAmountOfCorrectAnswers}
            updateIndexOfCurrentQuestion={updateIndexOfCurrentQuestion}
            updateIsQuizOver={updateIsQuizOver}
            updateCheckSkipped={updateCheckSkipped}/>
        : <UI/>;
};

export default Quiz;