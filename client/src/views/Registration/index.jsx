import React from 'react';
import {
  Container,
  Message,
  StyledSVGIcon,
  StyledButton,
  MainText,
  MiddleText,
  CautionText,
  StyledLink,
} from './styles';

const goToGoogleLogin = () => window.location.assign('/auth/google');

const Registration = () => (
  <Container>
    <Message>
      <MainText>
          Już tylko jedno kliknięcie dzieli Cię od dołączenia do największego grona aktywnych studentów we Wrocławiu!
      </MainText>
      <MiddleText>
          Zarejestruj się z wykorzystaniem konta Google dzieki czemu będziesz w stanie w pełni wykorzystać możliwości inStudy.
      </MiddleText>
      <CautionText>
        {'Logując się akceptujesz '}
        <StyledLink href="/pdf/test.pdf" target="__blank">politykę&nbsp;prywatności</StyledLink>
        {' oraz '}
        <StyledLink href="/pdf/test.pdf" target="__blank">regulamin</StyledLink>
        {' portalu.'}
      </CautionText>
      <StyledButton size="large" onClick={goToGoogleLogin}>
        <StyledSVGIcon path="/img/google_icon.svg" width={32} height={32} />
        <span>Zaloguj się przez Google</span>
      </StyledButton>
    </Message>
  </Container>
);

export default Registration;
