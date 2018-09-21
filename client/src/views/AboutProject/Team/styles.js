import styled from 'styled-components';
import { Container } from 'components';
import { media } from 'utils';

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.div`
  padding: 80px 0 var(--space-lg);
  text-align: center;
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  font-weight: var(--bold);
  color: var(--text1);
  ${media.xs`
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
  `}
`;

export const TeamList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: var(--space-xl);
  align-items: start;
  margin-top: var(--space-xl);
  ${media.xl`
    grid-template-columns: repeat(6, 1fr);
  `}
  ${media.lg`
    grid-template-columns: repeat(5, 1fr);
  `}
  ${media.md`
    grid-template-columns: repeat(4, 1fr);
  `}
  ${media.sm`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.xs`
    grid-template-columns: repeat(2, 1fr);
  `}
`;
