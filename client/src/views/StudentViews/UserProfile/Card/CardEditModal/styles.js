import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 188px 1fr;
  grid-gap: 0 var(--space-xl);

  > div {
    grid-column: 1/3;
  }

  > div:nth-child(1) {
    grid-area: 1/1/4/2;
  }

  > div:nth-child(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-child(3) {
    grid-area: 2/2/3/3;
  }

  > div:nth-child(4) {
    grid-area: 3/2/4/3;
  }
`;
