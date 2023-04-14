import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import API from '../API/API';
import { TokenContext } from '../Auth/useAuth';
import { StyledButton, UserInfo } from './SignUpForm';

const SignInForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
  const [isButtonAbled, setIsButtonAbled] = useState<boolean>(false);
  const { login } = useContext(TokenContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const signInUser = async () => {
    const data = { email: userInfo.email, password: userInfo.password };
    const response = await API.signIn(data);
    const authToken = response.data.access_token;
    login(authToken);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signInUser();
  };

  const validateEmail = (email: string): boolean => {
    return email.includes('@');
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  useEffect(() => {
    setIsButtonAbled(validateEmail(userInfo.email) && validatePassword(userInfo.password));
  }, [userInfo]);
  return (
    <StyledSignInForm>
      <h1>로그인</h1>
      <input
        name='email'
        value={userInfo.email}
        onChange={handleInputChange}
        data-testid='email-input'
        placeholder='email'
      />
      <input
        name='password'
        type='password'
        value={userInfo.password}
        onChange={handleInputChange}
        data-testid='password-input'
        placeholder='password'
      />
      <StyledButton
        data-testid='signin-button'
        type='submit'
        disabled={!isButtonAbled}
        onClick={handleSubmit}
      >
        확인
      </StyledButton>
      <StyledButton type='button' onClick={() => navigate('/signup')}>
        회원가입하기
      </StyledButton>
    </StyledSignInForm>
  );
};

const StyledSignInForm = styled.form`
  h1 {
    font-size: 1.5rem;
  }
  width: 400px;
  height: 300px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 300px;
    height: 30px;
    margin-top: 20px;
  }
`;
export default SignInForm;
