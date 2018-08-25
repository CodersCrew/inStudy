import styled from 'styled-components';

export const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 var(--space-xl);

  > div:last-of-type {
    grid-area: 4/1/5/3;
  }
`;
