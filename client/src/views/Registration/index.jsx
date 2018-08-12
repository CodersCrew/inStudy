import React, { PureComponent } from 'react';
import TriangleBackground from 'components/TriangleBackground';
import { Container, Message, StyledSVGIcon, StyledButton, MainText, MiddleText, CautionText, StyledLink } from './styles';

const goToGoogleLogin = () => window.location.assign('/auth/google');

class Registration extends PureComponent {
    constructor(props) {
        super(props);
        window.disableHomeAnimation = true;
    }

    componentWillUnmount() {
        setTimeout(() => {
            window.disableHomeAnimation = false;
        }, 100);
    }

    render() {
        return (
            <Container>
                <Message>
                    <MainText>Już tylko jedno kliknięcie dzieli Cię od dołączenia do największego grona aktywnych studentów we Wrocławiu!</MainText>
                    <MiddleText>Zarejestruj się z wykorzystaniem konta Google dzieki czemu będziesz w stanie w pełni wykorzystać możliwości inStudy.</MiddleText>
                    <CautionText>Logując się akceptujesz {" "}
                        <StyledLink to="/polityka_prywatnosci"> 
                           politykę prywatności 
                        </StyledLink>
                        {" "} oraz {" "}
                        <StyledLink to="/regulamin">
                             regulamin 
                        </StyledLink> 
                        {" "} portalu.
                    </CautionText>
                    <StyledButton kind='white' onClick={goToGoogleLogin}>
                        <StyledSVGIcon path='/img/google_icon.svg' width={32} height={32} />
                    Zaloguj się przez Google
                    </StyledButton>
                </Message>
                <TriangleBackground />
            </Container>
        );
    }
}

export default Registration;
