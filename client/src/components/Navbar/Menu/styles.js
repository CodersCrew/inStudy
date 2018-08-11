import styled from 'styled-components';
import { Link } from 'react-router-dom';

const itemStyles = `
  width: 100%;
  padding: var(--space-md);
  transition: all 0.3s var(--ease-in-out);
  background-color: var(--white);
  color: var(--text1);
  cursor: pointer;

  &:hover {
    background-color: var(--grey7);
  }

  &:active {
    background-color: var(--grey6);
  }
`;

export const Container = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  ${itemStyles};
`;

export const ItemLink = styled(Link)`
  ${itemStyles};
  text-decoration: none;
`;
