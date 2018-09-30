import styled from 'styled-components';
import { media } from 'utils';
import { Button } from 'antd';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 var(--space-xl);

  > div:nth-of-type(1) {
    grid-area: 1/1/2/2;
  }

  > div:nth-of-type(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-of-type(3) {
    grid-area: 2/1/3/3;
  }

  > button {
    min-width: 120px;
    max-width: 120px;
    grid-area: 3/2/4/3;
    justify-self: end;
  }

  ${media.sm`
    grid-template-columns: 1fr;

    > div,
    > button {
      grid-area: unset !important;
    }
  `}
`;

export const StyledButton = styled(Button)`
  background-color: var(--customColor) !important;
  border-color: var(--customColor) !important;
`;