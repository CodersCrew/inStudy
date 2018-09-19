import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  top: ${props => (props.isProfile ? '48px' : 0)};
  padding: ${props => (props.isProfile || props.isSingleView ? 'var(--space-xl) 0' : 0)};
  ${media.lg`
    padding: ${props => (props.isProfile || props.isSingleView ? 'var(--space-lg) 0' : 0)};
  `};
`;
