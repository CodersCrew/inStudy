import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--space-md);
`;

export const NavItem = styled.div`
  user-select: none;
  height: 14px;
  margin-right: var(--space-lg);
  color: #fff;
  font-size: var(--font-sm);
  line-height: 1;
  cursor: pointer;
  position: relative;
`;

export const NavItemLink = styled(Link)`
  user-select: none;
  text-decoration: none;
  margin-right: var(--space-lg);
  color: #fff;
  font-size: var(--font-sm);
  line-height: 1;
  cursor: pointer;
`;

export const Icon = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: var(--space-sm);
  color: #fff;
  font-size: var(--font-lg);
`;
