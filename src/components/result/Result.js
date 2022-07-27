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
        if (amountOfCorrectAnswers === totalAmountOfQuestions) {
            if (currentDifficulty === 'Легкий' && !mediumDiffucultyData?.isAvailable) {
                updateDifficulty({
                    id: mediumDiffucultyData.id,
                    isAvailable: true
                });
            } 

            if (currentDifficulty === 'Средний' && !hardDiffucultyData?.isAvailable) {
                updateDifficulty({
                    id: hardDiffucultyData.id,
                    isAvailable: true
                });
            } 
        }

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