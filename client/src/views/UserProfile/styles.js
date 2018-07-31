import styled from 'styled-components';
import { Container } from 'react-ui-framework';

export const MainContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-gap: var(--space-xl);
  padding-top: var(--space-xxl);
`;

export const LeftColumn = styled.div`
  box-sizing: border-box;
`;

export const RightColumn = styled.div`
  height: 100vh;
  background-color: red;
`;
