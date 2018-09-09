import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: var(--space-md);
  ${media.xxl`
    grid-template-columns: repeat(7, 1fr);
  `}
  ${media.xl`
    grid-template-columns: repeat(6, 1fr);
  `}
  ${media.lg`
    grid-template-columns: repeat(5, 1fr);
  `}
  ${media.sm`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export const StyledTooltip = styled(Tooltip)`
  position: relative;
  padding-top: 100%;
`;

export const Icon = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey5);
  border-radius: 4px;

  &:hover img {
    transform: scale(1.1);
  }
`;

export const Image = styled.img`
  max-width: calc(100% - 16px);
  max-height: calc(100% - 24px);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);
`;
