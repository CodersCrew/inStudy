import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: var(--space-xl) var(--space-lg);
  ${media.xl`
    grid-template-columns: repeat(3, auto);
  `}
  ${media.sm`
    grid-template-columns: repeat(2, auto);
  `}
  ${media.xs`
    grid-template-columns: repeat(1, auto);
  `}
`;

export const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const NumberValue = styled.div`
  font-size: var(--font-xxl);
  line-height: 1;
  font-weight: var(--medium);
  color: var(--customColor);
`;

export const Line = styled.div`
  height: 2px;
  width: 32px;
  margin: var(--space-sm) 0;
  background-color: var(--customColor);
`;

export const Title = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--text1);
`;
