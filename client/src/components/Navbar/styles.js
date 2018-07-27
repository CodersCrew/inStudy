import styled from 'styled-components';
import { SVGIcon } from 'react-ui-framework';
import { media } from 'react-ui-framework/lib/utils';

export const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: var(--primary1);
  padding: var(--space-sm) var(--space-lg);
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
  background-color: #fff;
  opacity: 0.2;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
`;
