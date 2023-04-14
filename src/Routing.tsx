import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import ToDoPage from './Pages/ToDoPage';
import { TokenContext } from './Auth/useAuth';
import { useContext } from 'react';

const Routing: React.FC = (): JSX.Element => {
  const { token } = useContext(TokenContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/signin' />} />
        <Route path='/signup' element={token ? <Navigate to='/todo' /> : <SignUpPage />} />
        <Route path='/signin' element={token ? <Navigate to='/todo' /> : <SignInPage />} />
        <Route path='/todo' element={token ? <ToDoPage /> : <Navigate to='/signin' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
