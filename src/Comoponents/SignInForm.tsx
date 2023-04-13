import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledButton, UserInfo } from './SignUpForm';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
  const [isButtonAbled, setIsButtonAbled] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // submit logic
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
      <div>로그인</div>
      <input
        name='email'
        value={userInfo.email}
        onChange={handleInputChange}
        data-testid='email-input'
        placeholder='email'
      />
      <input
        name='password'
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
  button {
    margin-top: 20px;
    width: 140px;
    height: 30px;
    color: #fff;
    cursor: pointer;
  }
`;
export default SignInForm;
