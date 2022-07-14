import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainPage from "../pages/MainPage";
import QuizPage from "../pages/QuizPage";
import Page404 from "../pages/404";

import '../../style/_base.sass';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<MainPage/>}/>
					<Route path="/quiz" element={<QuizPage/>}/>
					<Route path="*" element={<Page404/>}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
