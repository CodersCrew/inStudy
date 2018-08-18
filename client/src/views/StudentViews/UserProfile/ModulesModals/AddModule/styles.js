import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
`;

export const Label = styled.h6`
  margin-bottom: 16px;
`;

export const Modules = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--space-lg);
`;
