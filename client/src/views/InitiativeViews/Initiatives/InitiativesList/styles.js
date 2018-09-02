import styled from 'styled-components';
import { Container } from 'components';
import { media } from 'utils';

export const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--space-xl);
  padding: var(--space-lg) 0;
  ${media.md`
    grid-template-columns: repeat(1, 1fr);
  `};
  ${media.sm`
    width: calc(100% - 64px);
  `};
  ${media.xs`
    grid-gap: var(--space-lg);
    width: calc(100% - 32px);
  `};
`;
