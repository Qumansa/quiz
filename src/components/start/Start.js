import { Link } from 'react-router-dom'; 

import { 
    useGetDifficultiesQuery,
    useGetCurrentDifficultyQuery,
    useUpdateCurrentDifficultyMutation
} from '../../api/quizApi';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './start.sass';

const Start = () => {
    const {data: currentDifficulty} = useGetCurrentDifficultyQuery();
    const [updateCurrentDifficulty] = useUpdateCurrentDifficultyMutation();

    const {
        data: difficulties,
        isLoading: areDifficultiesLoading,
        isError: areDifficultiesError
    } = useGetDifficultiesQuery();

    const onSelect = (e) => {
        updateCurrentDifficulty({
            currentDifficulty: e.target.value
        });
    };

    const UI = () => {
        const getDifficultiesView = (arr) => {
            const items = arr.map(({id, name, isAvailable}) => {
                return (
                    <option 
                        className="start__option"
                        key={id} 
                        value={name}
                        // disabled={!isAvailable}
                        >
                        {name}
                    </option>
                );
            });

            return (
                <select 
                    className="start__select"
                    value={currentDifficulty}
                    onChange={onSelect}>
                    {items}
                </select>
            );
        };

        const difficultiesView = areDifficultiesLoading 
            ? <Spinner/>
            : areDifficultiesError 
            ? <ErrorMessage/> 
            : getDifficultiesView(difficulties);

        return (
            <>
                <section className="start section">
                    <div className="container">
                        <h1 className="title">Quiz</h1>
                        <p className="start__descr">Добро пожаловать в викторину "Quiz"!</p>
                        <p className="start__descr">Здесь Вы сможете попробовать свои силы и проверить знания, отвечая на различные вопросы о веб-разработке.</p>
                        <p className="start__descr">Существует 3 уровня сложности: легкий, средний и сложный. В каждом уровне сложности содержится по 10 вопросов. Для того, чтобы пройти уровень, необходимо успешно ответить на 7/10 вопросов, после чего откроется следующий. Если Вы затрудняетесь ответить, вопрос можно пропустить и вернуться к нему позднее.</p>
                        <div className="start__difficulty">
                            Выберите уровень сложности:
                            {difficultiesView}
                        </div>
                        <p className="start__descr">Желаем удачи!</p>
                        <div className="start__link-wrapper">
                            <Link 
                                className="
                                    start__link 
                                    button" 
                                to="/quiz">
                                Начать
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    return <UI/>  
};

export default Start;