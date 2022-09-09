import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 

import { 
    useGetDifficultiesQuery,
    useUpdateDifficultyMutation,
    useGetCurrentDifficultyQuery,
    useUpdateIsQuizStartedMutation
} from '../../api/quizApi';

import './result.sass';

const Result = ({amountOfCorrectAnswers, totalAmountOfQuestions, updateAmountOfCorrectAnswers, updateIndexOfCurrentQuestion, updateIsQuizOver, updateCheckSkipped}) => {
    const {data: difficulties = []} = useGetDifficultiesQuery();
    const {data: currentDifficulty} = useGetCurrentDifficultyQuery();
    const [updateDifficulty] = useUpdateDifficultyMutation();
    const [updateIsQuizStarted] = useUpdateIsQuizStartedMutation();

    const mediumDiffucultyData = difficulties.filter(difficulty => difficulty.name === 'Средний')[0];
    const hardDiffucultyData = difficulties.filter(difficulty => difficulty.name === 'Сложный')[0];

    const onReset = () => {
        updateCheckSkipped({
            checkSkipped: false
        });
        updateAmountOfCorrectAnswers({
            amountOfCorrectAnswers: 0
        });
        updateIndexOfCurrentQuestion({
            indexOfCurrentQuestion: 1
        });
        updateIsQuizStarted({
            isQuizStarted: false
        });
        updateIsQuizOver({
            isQuizOver: false
        });
    };

    const commentView = amountOfCorrectAnswers <= 3
        ? 'Вы показали плохой результат! Возможно, вы совсем не знакомы с основами веб-разработки или только начинаете с ними работать. Вам стоит подтянуть свои знания и попробовать снова!'
        : amountOfCorrectAnswers >= 4 && amountOfCorrectAnswers <= 7
        ? 'Вы показали средний результат, однако не стоит останавливаться на достигнутом! Читайте статьи и используйте полученные знания на практике, чтобы эффективнее развиваться в качестве веб-разработчика.'
        : amountOfCorrectAnswers >= 8 
        ? 'Поздравляем, у вас отличный результат! Вы отлично разбираетесь в основах веб-разработки и умеете использовать свои знания на практике. Продолжайте в том же духе!'
        : 'Произошла ошибка! Пожалуйста, попробуйте позже.';

    const unblockingView = useRef(null);

    useEffect(() => {
        if (amountOfCorrectAnswers >= 8) {
            if (currentDifficulty === 'Легкий' && !mediumDiffucultyData?.isAvailable) {
                updateDifficulty({
                    id: mediumDiffucultyData.id,
                    isAvailable: true
                });
    
                unblockingView.current = <p className="result__unblocking">Вы разблокировали средний уровень сложности!</p>;
            } 
    
            if (currentDifficulty === 'Средний' && !hardDiffucultyData?.isAvailable && hardDiffucultyData) {
                updateDifficulty({
                    id: hardDiffucultyData.id,
                    isAvailable: true
                });
    
                unblockingView.current = <p className="result__unblocking">Вы разблокировали сложный уровень сложности!</p>;
            } 
        }
    }, [amountOfCorrectAnswers, currentDifficulty, mediumDiffucultyData, hardDiffucultyData, totalAmountOfQuestions, updateDifficulty]);

    return (
        
        <>
            <section className="result section">
                <div className="container">
                    <h1 className="title">Результат</h1>
                    <div className="result__score">
                        {amountOfCorrectAnswers} / {totalAmountOfQuestions} 
                    </div>
                    <p className="result__comment">
                        {commentView}
                    </p>
                    {unblockingView.current}
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