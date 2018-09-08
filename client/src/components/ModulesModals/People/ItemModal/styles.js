import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 192px 1fr;
  grid-gap: 0 var(--space-xl);

  > div:nth-of-type(1) {
    grid-area: 1/1/4/2;
  }

  > div:nth-of-type(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-of-type(3) {
    grid-area: 2/2/3/3;
  }

  > div:nth-of-type(4) {
    grid-area: 3/2/4/3;
  }

  > div:nth-of-type(5) {
    grid-area: 4/1/5/3;
  }
`;

export const Actual = styled.div`
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--text1);
    background-color: var(--grey7);
  }

  &:active {
    background-color: var(--grey6);
  }
`;
