import styled from 'styled-components';
import { Container } from 'components';
import { Button } from 'antd';

export const MainContainer = styled(Container)`
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--space-xl) auto 0;
  max-width: 480px;
  color: var(--text1);
`;

export const Icon = styled.i`
  margin-bottom: var(--space-sm);
  font-size: 48px;
`;

export const Header = styled.div`
  margin-bottom: var(--space-lg);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--bold);
  text-align: center;
`;

export const StyledButton = styled(Button)`
  width: 264px;
  &:first-of-type {
    margin-bottom: var(--space-md);
  }
`;
