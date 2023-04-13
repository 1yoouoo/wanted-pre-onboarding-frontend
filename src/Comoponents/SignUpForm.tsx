import styled from 'styled-components';

const SignUpForm = () => {
  return (
    <StyledSignUpForm>
      <div>회원가입</div>
      <input data-testid='email-input' />
      <input data-testid='password-input' />
      <button data-testid='signup-button' type='button'>
        확인
      </button>
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
  }
`;
export default SignUpForm;
