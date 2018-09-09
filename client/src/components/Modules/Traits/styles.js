import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--space-xl);
  ${media.xl`
    grid-template-columns: 1fr 1fr;
  `}
  ${media.sm`
    grid-template-columns: 1fr;
  `}
`;

export const TraitContainer = styled.div`
  box-sizing: border-box;
`;

export const Icon = styled.div`
  margin-bottom: var(--space-md);
  font-size: var(--font-xxl);
  color: var(--primary2);
`;

export const Name = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
  margin-bottom: var(--space-sm);
`;

export const Description = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;
