import styled from 'styled-components';
import { media } from 'react-ui-framework/lib/utils';

export const Container = styled.div`
  padding: var(--space-xxl) 0;
  ${media.lg`
    padding: var(--space-xl) 0;
  `};
`;
