import { Link } from 'react-router-dom'; 

import './start.sass';

const Start = () => {
    return (
        <>
            <section className="start section">
                <div className="container">
                    <h1 className="start__title">Quiz</h1>
                    <p className="start__descr">Добро пожаловать в викторину "Quiz"!</p>
                    <p className="start__descr">Здесь Вы сможете попробовать свои силы и проверить знания, отвечая на различные вопросы о веб-разработке.</p>
                    <p className="start__descr">Существует 3 уровня сложности: легкий, средний и сложный. В каждом уровне сложности содержится по 10 вопросов. Для того, чтобы пройти уровень, необходимо успешно ответить на 7/10 вопросов, после чего откроется следующий. Если Вы затрудняетесь ответить, вопрос можно пропустить и вернуться к нему позднее.</p>
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

export default Start;