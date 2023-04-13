import styled from 'styled-components';

const SignInForm = () => {
  return (
    <StyledSignInForm>
      <div>로그인</div>
      <input data-testid='email-input' />
      <input data-testid='password-input' />
      <button data-testid='signup-button' type='button'>
        확인
      </button>
      <button type='button'>회원가입하기</button>
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
  }
`;
export default SignInForm;
