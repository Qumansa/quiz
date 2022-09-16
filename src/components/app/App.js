import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainPage from "../pages/MainPage";
import QuizPage from "../pages/QuizPage";
import Page404 from "../pages/Page404";

import '../../style/_base.sass';

const App = () => {
	return (
		<Router>
			<div className="App">
				<main>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/quiz" element={<QuizPage/>}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
