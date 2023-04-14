import styled from 'styled-components';
import SignInForm from '../Comoponents/SignInForm';

const SignInPage = () => {
  return (
    <StyledSignInPage>
      <SignInForm />
    </StyledSignInPage>
  );
};

const StyledSignInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
export default SignInPage;
