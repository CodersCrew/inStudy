import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  ${media.sm`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
  ${media.xs`
    padding: 0 var(--space-md);
  `}
`;
export const Icon = styled.div`
  font-size: var(--font-xxl);
  color: var(--primary2);
`;

export const Title = styled.div`
  padding: var(--space-md) 0;
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  font-weight: var(--medium);
  color: var(--text1);
  ${media.lg`
    padding: var(--space-sm) 0;
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
  `}
`;

export const Description = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--text2);
  ${media.lg`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `}
`;
