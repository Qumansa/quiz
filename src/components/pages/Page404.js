import { Link } from 'react-router-dom'; 

import '../../style/page404.sass';

const Page404 = () => {
    return (
        <section className="page404 section">
            <h1 className="title">404 страница не найдена!</h1>
            <Link to="/" className="page404__link button">На главную</Link>
        </section>
    );
};

export default Page404;