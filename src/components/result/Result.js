import { Link } from 'react-router-dom'; 

import './result.sass';

const Result = ({amountOfCorrectAnswers, totalAmountOfQuestions, updateAmountOfCorrectAnswers, updateIndexOfCurrentQuestion}) => {
    const onReset = () => {
        const amountOfCorrectAnswersData = {
            amountOfCorrectAnswers: 0
        };

        updateAmountOfCorrectAnswers(amountOfCorrectAnswersData);

        const indexOfCurrentQuestionData = {
            indexOfCurrentQuestion: 1
        };

        updateIndexOfCurrentQuestion(indexOfCurrentQuestionData);
    };

    return (
        <>
            <section className="result section">
                <div className="container">
                    <h1 className="title">Результат</h1>
                    <div className="result__score">
                        {amountOfCorrectAnswers} / {totalAmountOfQuestions} 
                    </div>
                    <div className="result__button-wrapper">
                        <Link 
                            className="result__button button" 
                            to="/"
                            onClick={onReset}>
                            На главную
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Result;