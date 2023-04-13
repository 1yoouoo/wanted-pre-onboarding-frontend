import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export interface UserInfo {
  email: string;
  password: string;
}

const SignUpForm = () => {
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
    <StyledSignUpForm>
      <div>회원가입</div>
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
        data-testid='signup-button'
        type='submit'
        disabled={!isButtonAbled}
        onClick={handleSubmit}
      >
        확인
      </StyledButton>
      <StyledButton type='button' onClick={() => navigate('/signin')}>
        로그인하기
      </StyledButton>
    </StyledSignUpForm>
  );
};

const StyledSignUpForm = styled.form`
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
export const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? 'red' : 'green')};
`;
export default SignUpForm;
