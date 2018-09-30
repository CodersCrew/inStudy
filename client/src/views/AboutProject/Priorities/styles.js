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

export const PrioritiesList = styled.div`
  margin-top: var(--space-xxl);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--space-xxl);
  ${media.lg`
    margin-top: var(--space-xl);
    grid-gap: var(--space-xl);
  `}
  ${media.md`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${media.sm`
    grid-template-columns: repeat(1, 1fr);
  `}
`;
