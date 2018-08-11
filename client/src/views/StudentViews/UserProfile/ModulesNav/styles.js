import styled from 'styled-components';

export const Container = styled.div`
  padding-left: var(--space-md);

  > div + div {
    margin-top: var(--space-md);
  }
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary2);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);
  user-select: none;

  i {
    color: var(--white);
    font-size: var(--font-lg);
  }

  &:hover {
    background-color: var(--primary2-hover);
  }

  &:active {
    background-color: var(--primary2-active);
  }
`;
