import styled from 'styled-components';
import { Button } from 'antd';

export const Row = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 32px;
  grid-gap: var(--space-md);
`;

export const TrashButton = styled(Button).attrs({
  icon: 'delete',
})`
  margin-top: 21.5px;
`;
