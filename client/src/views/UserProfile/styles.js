import styled from 'styled-components';
import { Container } from 'react-ui-framework';
import { media } from 'react-ui-framework/lib/utils';

export const MainContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-gap: var(--space-xl);
  padding: var(--space-xxl) 0;
  ${media.lg`
    grid-gap: var(--space-lg);
    padding-top: var(--space-xl);
  `};
  ${media.md`
    grid-template-columns: 1fr;
    grid-gap: var(--space-xl);
  `};
  ${media.xs`
    grid-gap: var(--space-lg);
  `};
`;

export const LeftColumn = styled.div`
  box-sizing: border-box;
`;

export const RightColumn = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 64px;
`;
