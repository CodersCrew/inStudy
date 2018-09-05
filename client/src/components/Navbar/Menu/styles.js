import styled from 'styled-components';
import { Link } from 'react-router-dom';

const itemStyles = `
  width: 100%;
  color: var(--text1) !important;
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
