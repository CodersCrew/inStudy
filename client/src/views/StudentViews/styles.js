import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  top: 48px;
  padding: var(--space-xl) 0;
  ${media.lg`
    padding: var(--space-lg) 0;
  `};
`;
