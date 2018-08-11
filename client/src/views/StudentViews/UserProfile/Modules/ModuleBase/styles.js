import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  background-color: var(--white);
  box-shadow: var(--shadow1);
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Icon = styled.h1`
  color: blue;
`;

export const Text = styled.h1`
  margin-left: var(--space-md);
`;
