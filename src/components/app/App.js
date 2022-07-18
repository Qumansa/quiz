import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainPage from "../pages/MainPage";
import QuizPage from "../pages/QuizPage";
import ResultPage from "../pages/ResultPage";
import Page404 from "../pages/404";

import '../../style/_base.sass';

const App = () => {
	return (
		<Router>
			<div className="App">
				<main>
					<Routes>
						{/* <Route
							exact
							path="/form"
							render={() => (
								this.state.validate ? (
								<Redirect to="/home"/>
								) : (
								<FormPage/>
								)
							)}
						/> */}
						<Route path="/" element={<MainPage/>}/>
						<Route path="/quiz" element={<QuizPage/>}/>
						<Route path="/result" element={<ResultPage/>}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
