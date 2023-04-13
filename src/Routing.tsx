import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';

const Routing: React.FC = (): JSX.Element => (
	<BrowserRouter>
		<Routes>
			<Route path="/signup" element={<SignUpPage />}></Route>
		</Routes>
	</BrowserRouter>
);

export default Routing;
