import styled from 'styled-components';
import { Container } from 'components';
import { media } from 'utils';

export const MainContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3fr 9fr 64px;
  grid-gap: var(--space-xl) 0;
  height: 200vh;
  ${media.lg`
    grid-gap: var(--space-lg) 0;
  `};
  ${media.md`
    grid-template-columns: 1fr 64px;
    grid-gap: var(--space-lg) 0;
  `};
`;

export const LeftColumn = styled.div`
  box-sizing: border-box;
  grid-area: 1/1/2/2;
  margin-right: var(--space-xl);
  ${media.lg`
    grid-gap: var(--space-lg) 0;
    margin-right: var(--space-lg);
  `};
  ${media.md`
    margin-right: 0;
    grid-area: 1/1/2/2;
    grid-template-columns: 1fr;
    grid-gap: var(--space-xl);
  `};
`;

export const RightColumn = styled.div`
  box-sizing: border-box;
  grid-area: 1/2/2/3;
  display: grid;
  grid-template-columns: 1fr 64px;

  div:only-child {
    grid-area: 1/1/2/3;
  }

  ${media.md`
    grid-area: 2/1/3/2;
    grid-template-columns: 1fr;
    grid-gap: var(--space-xl);
  `};
`;

export const NavColumn = styled.div`
  grid-area: 1/3/2/4;
  ${media.md`
    grid-area: 1/2/3/3;
  `};
`;
