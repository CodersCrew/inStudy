import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 var(--space-xl);

  > div:last-of-type {
    grid-area: 4/1/5/3;
  }

  ${media.xs`
    grid-template-columns: 1fr;

    > div:last-of-type {
      grid-area: unset;
    }
  `}
`;
