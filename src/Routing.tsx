import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import ToDoPage from './Pages/ToDoPage';
import { isLogin } from './utills/function';

const Routing: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={isLogin() ? <Navigate to='/todo' /> : <SignUpPage />} />
        <Route path='/signin' element={isLogin() ? <Navigate to='/todo' /> : <SignInPage />} />
        <Route path='/todo' element={isLogin() ? <ToDoPage /> : <Navigate to='/signin' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
