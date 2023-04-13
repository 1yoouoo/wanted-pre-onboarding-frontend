import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';

const Routing: React.FC = (): JSX.Element => (
	<BrowserRouter>
		<Routes>
			<Route path="/signup" element={<SignUpPage />}></Route>
			<Route path="/signin" element={<SignInPage />}></Route>
		</Routes>
	</BrowserRouter>
);

export default Routing;
