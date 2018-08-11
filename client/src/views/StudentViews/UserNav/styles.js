import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 48px;
  background-color: var(--white);
  box-shadow: var(--shadow3);
`;

export const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
  padding: 0 var(--space-xl);
  outline: none;
  text-decoration: none;
  color: var(--text1);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    background-color: var(--grey7);
  }

  &:active {
    background-color: var(--grey6);
  }

  &.active {
    border-bottom: 2px solid var(--primary2);
    background-color: var(--grey7);
    color: default;
  }
`;
