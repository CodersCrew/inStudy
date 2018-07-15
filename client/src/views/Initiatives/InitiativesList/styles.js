import styled from 'styled-components';
import { Container } from 'react-ui-framework';

export const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--space-xl);
  padding: var(--space-lg) 0;
`;
