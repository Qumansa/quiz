import { useGetQuestionQuery } from '../../api/quizApi';

import Spinner from '../spinner/Spinner';

import './quiz.sass';

const Quiz = () => {
    const {
        data: question = {},
        isLoading,
        isError,
    } = useGetQuestionQuery(1);

    const {indexNumber, description, answers} = question;

    // const renderedAnswers = renderAnswers(answers);

    const UI = () => {
        const questionNumberView = isLoading 
            ? "-" 
            : indexNumber;
        const descriptionView = isLoading 
            ? <Spinner/> 
            : <p className="question__descr">{description}</p>;

        const getAnswerView = (index) => {
            return isLoading ? "Загрузка..." : answers[index];
        };

        return (
            <section className="section section_first">
                <div className="container">
                    <div className="question__counter">
                        <svg className="question__icon" viewBox="-1 0 18 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4829 5.28193L10.6864 4.59758L8.54222 0.330127C8.48365 0.213287 8.38731 0.118702 8.26829 0.0612089C7.96981 -0.0834504 7.6071 0.037099 7.45786 0.330127L5.3137 4.59758L0.517213 5.28193C0.384974 5.30047 0.26407 5.36167 0.171503 5.45441C0.0595945 5.56733 -0.0020722 5.71924 5.31712e-05 5.87678C0.00217854 6.03431 0.0679221 6.18457 0.182838 6.29454L3.65316 9.61614L2.83328 14.3064C2.81405 14.4156 2.82635 14.5278 2.86878 14.6304C2.91121 14.733 2.98207 14.8218 3.07333 14.8869C3.16459 14.952 3.27259 14.9906 3.38509 14.9985C3.4976 15.0064 3.6101 14.9831 3.70983 14.9314L8.00004 12.717L12.2902 14.9314C12.4074 14.9926 12.5434 15.013 12.6737 14.9908C13.0024 14.9352 13.2235 14.6291 13.1668 14.3064L12.3469 9.61614L15.8172 6.29454C15.9117 6.20367 15.974 6.08497 15.9929 5.95515C16.0439 5.63059 15.8135 5.33015 15.4829 5.28193Z" fill="white"></path>
                        </svg>
                        <span className="question__text">
                            Вопрос <span className="question__number">{questionNumberView}</span>/10
                        </span>
                    </div>
                    {descriptionView}
                    <form className="answers">
                        <ul className="answers__list">
                            <li 
                                className="answers__item">
                                <input 
                                    id="answer0"
                                    className="answers__radio sr-only"
                                    type="radio"
                                    name="answer"/>
                                <label 
                                    className="answers__descr" 
                                    htmlFor="answer0">
                                    {getAnswerView(0)}
                                </label>
                            </li>
                            <li 
                                className="answers__item">
                                <input 
                                    id="answer1"
                                    className="answers__radio sr-only"
                                    type="radio"
                                    name="answer"/>
                                <label 
                                    className="answers__descr" 
                                    htmlFor="answer1">
                                    {getAnswerView(1)}
                                </label>
                            </li>
                            <li 
                                className="answers__item">
                                <input 
                                    id="answer2"
                                    className="answers__radio sr-only"
                                    type="radio"
                                    name="answer"/>
                                <label 
                                    className="answers__descr" 
                                    htmlFor="answer2">
                                    {getAnswerView(2)}
                                </label>
                            </li>
                            <li 
                                className="answers__item">
                                <input 
                                    id="answer3"
                                    className="answers__radio sr-only"
                                    type="radio"
                                    name="answer"/>
                                <label 
                                    className="answers__descr" 
                                    htmlFor="answer3">
                                    {getAnswerView(3)}
                                </label>
                            </li>
                        </ul>
                        <ul className="answers__buttons">
                            <li className="answers__buttons-item">
                                <button className="answers__submit button">Пропустить</button>
                            </li>
                            <li className="answers__buttons-item">
                                <button className="answers__submit button">Ответить</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        );
    };

    // const view = isError 
    //     ? <h2>Ошибка</h2>
    //     : isLoading 
    //     ? <h2>Спиннер</h2>
    //     : <UI/>;

    return (
        <>
            {/* {view} */}
            <UI/>
        </>
    );
};

export default Quiz;