import styled from 'styled-components';
import SignUpForm from '../Comoponents/SignUpForm';

const SignUpPage = () => {
	return (
		<StyledSignUpPage>
			<SignUpForm />
		</StyledSignUpPage>
	);
};

const StyledSignUpPage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;
export default SignUpPage;
