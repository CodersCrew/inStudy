import styled from 'styled-components';
import { Container } from 'react-ui-framework';

export const MainContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3fr 8fr 1fr;
  grid-gap: var(--space-xl);
  padding-top: var(--space-xxl);
`;

export const LeftColumn = styled.div`
  height: 100vh;
  background-color: green;
`;

export const RightColumn = styled.div`
  height: 100vh;
  background-color: red;
`;
