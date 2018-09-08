import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  top: ${props => (props.isProfile ? '48px' : 0)};
  padding: var(--space-xl) 0;
  ${media.lg`
    padding: var(--space-lg) 0;
  `};
`;
