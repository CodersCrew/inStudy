import styled from 'styled-components';
import { SVGIcon } from 'components';
import { media } from 'utils';

export const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: var(--customColor);
  padding: var(--space-sm) var(--space-lg);
  transition: all 0.3s var(--ease-in-out);
  ${media.sm`
    padding: var(--space-sm) var(--space-md);
  `};
`;

export const Logo = styled(SVGIcon)`
  height: 100%;
  margin-right: var(--space-lg);
  ${media.sm`
    margin-right: var(--space-md);
  `};
`;

export const Line = styled.div`
  height: 100%;
  width: 2px;
  background-color: var(--white);
  opacity: 0.2;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
`;
