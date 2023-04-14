import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ToDoPage from './pages/ToDoPage';
import { TokenContext } from './auth/useAuth';
import { useContext } from 'react';

const Routing: React.FC = (): JSX.Element => {
  const { token } = useContext(TokenContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={token ? <Navigate to='/todo' /> : <SignUpPage />} />
        <Route path='/signin' element={token ? <Navigate to='/todo' /> : <SignInPage />} />
        <Route path='/todo' element={token ? <ToDoPage /> : <Navigate to='/signin' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
