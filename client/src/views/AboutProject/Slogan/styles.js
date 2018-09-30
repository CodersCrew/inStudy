import styled from 'styled-components';
import { SVGIcon } from 'components';
import { media } from 'utils';

export const Photo = styled.div`
  background: url('/img/about-us-bg.png');
  height: 400px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${media.sm`
    height: 320px;
  `}
  ${media.xs`
    height: 200px;
  `}
`;

export const StyledSVGIcon = styled(SVGIcon)`
  width: 160px;
  height: 160px;
  ${media.sm`
    width: 120px;
    height: 120px;
  `}
  ${media.xs`
    width: 88px;
    height: 88px;
  `}
`;

export const Title = styled.div`
  width: 584px;
  margin-top: var(--space-lg);
  font-family: var(--headerFont);
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  font-weight: var(--regular);
  text-align: center;
  color: var(--white);
  ${media.sm`
    width: 100%;
    padding: 0 var(--space-xxl);
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
  `}
  ${media.xs`
    margin-top: var(--space-md);
    padding: 0 var(--space-xl);
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
    font-weight: var(--medium);
  `}
`;
