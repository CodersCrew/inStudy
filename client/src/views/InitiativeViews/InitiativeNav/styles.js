import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from 'utils';

export const Container = styled.div`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 10;
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
  text-decoration: none !important;
  color: var(--text1);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    background-color: var(--grey7);
    color: var(--customColor-hover);
  }

  &:active {
    background-color: var(--grey6);
    color: var(--customColor-active);
  }

  &.active {
    border-bottom: 2px solid var(--customColor);
    background-color: var(--grey7);
    color: default;
  }

  span:first-child {
    padding-right: var(--space-sm);
  }

  ${media.sm`
    span:last-child {
      display: none;
    }
  `}
`;
