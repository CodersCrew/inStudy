import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey6);
  border-radius: 4px;
  font-size: var(--font-lg);
  font-weight: var(--medium);
  text-align: center;
  line-height: var(--font-xl-lh);
  color: var(--text1);
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    background-color: var(--grey7);
    border: 1px solid var(--grey5);
  }

  &:active {
    background-color: var(--grey6);
    border: 1px solid var(--grey4);
  }
`;
