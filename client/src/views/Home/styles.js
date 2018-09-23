import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary2);
  top: ${props => (props.isLanding ? 0 : '-24px')};

  &::before {
    content: '';
    z-index: -1;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url('${props => props.src}') no-repeat bottom/cover;
  }
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 0 var(--space-xl);
  text-align: center;
  color: var(--white);
  ${media.xs`
    padding: 0 var(--space-md);
  `};
`;

export const Supheader = styled.p`
  user-select: none;
  padding-bottom: var(--space-xl);
  font-size: var(--font-xxl);
  font-weight: var(--regular);
  font-family: var(--headerFont);
  color: var(--white);
  opacity: 1;
  transition: all 0.3s linear;
  ${media.lg`
    font-size: var(--font-xl);
    padding-bottom: var(--space-lg);
  `};
  ${media.sm`
    font-size: var(--font-lg);
    padding-bottom: var(--space-md);
  `};
  ${media.xs`
    font-size: var(--font-md);
    padding-bottom: var(--space-sm);
  `};
`;

export const HeaderWrapper = styled.div`
  display: ${props => Number(props.style.transform.split(/\(|\)/)[1]) < 0.2 && 'none'};
  margin-bottom: var(--space-xxl);
  ${media.lg`
    margin-bottom: var(--space-xl);
  `}
  ${media.md`
    @media (orientation: landscape) {
      top: 0;
    }
  `}
  ${media.sm`
    line-height: 1.3;
    min-height: 82px;
  `}
  ${media.xs`
    margin-bottom: var(--space-md);
    min-height: 62px;
  `}

  span {
    user-select: none;
    line-height: 1;
    font-size: 52px;
    font-weight: var(--bold);
    font-family: var(--headerFont);
    opacity: 1;
    ${media.lg`
      font-size: 40px;
    `}
    ${media.md`
      font-size: var(--font-xxl);
    `}
    ${media.sm`
      line-height: 1.3;
    `}
    ${media.xs`
      font-size: var(--font-xl);
    `}
  }
`;
