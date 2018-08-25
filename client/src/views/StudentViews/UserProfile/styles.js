import styled from 'styled-components';
import { Container } from 'components';
import { media } from 'utils';

export const MainContainer = styled(Container)`
  ${media.md`
    flex-wrap: wrap;
  `};
`;

export const LeftColumn = styled.div`
  min-width: 288px;
  max-width: 288px;
  margin-right: var(--space-xl);
  ${media.xl`
    min-width: 240px;
    max-width: 240px;
  `};
  ${media.md`
    min-width: 100%;
    max-width: 100%;
  `};
`;

export const RightColumn = styled.div`
  flex: 1;
  ${media.md`
    min-width: 100%;
    max-width: 100%;
  `};
`;

export const NavColumn = styled.div`
  min-width: 48px;
  max-width: 48px;
  margin-left: var(--space-md);
`;
