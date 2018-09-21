import styled from 'styled-components';
import { media } from 'utils';

export const Heading = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  padding: 80px 0 var(--space-lg);
  font-weight: var(--bold);
  color: var(--text1);
  ${media.xs`
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
  `}
`;

export const Texts = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  text-align: center;
  color: var(--text2);
  ${media.sm`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `}
  ${media.xs`
    padding: 0 var(--space-md);
  `}
`;

export const Paragraph = styled.div`
  & + div {
    margin-top: var(--space-lg);
  }
`;
