import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

const getPosition = ({ position, offset }) => {
  switch (position) {
    case 'left top':
      return `top: ${40 + offset[1]}px; left: ${40 + offset[0]}px;`;
    case 'left center':
      return `top: calc(50vh + ${offset[1] - 28}px); left: ${40 + offset[0]}px;`;
    case 'left bottom':
      return `bottom: ${40 + offset[1]}px; left: ${40 + offset[0]}px;`;
    case 'center top':
      return `top: ${40 + offset[1]}px; left: calc(50vw + ${offset[0] - 28}px);`;
    case 'center bottom':
      return `bottom: ${40 + offset[1]}px; left: calc(50vw + ${offset[0] - 28}px);`;
    case 'right top':
      return `top: ${40 + offset[1]}px; right: ${40 + offset[0]}px;`;
    case 'right center':
      return `top: calc(50vh + ${offset[1] - 28}px); right: ${40 + offset[0]}px;`;
    default:
      return `bottom: ${40 + offset[1]}px; right: ${40 + offset[0]}px;`;
  }
};

const getOffsetValue = pos => (pos ? `${pos * 64 + 16}` : 8);

const getItemOffset = ({ pos, position }) => {
  if (position.includes('top')) {
    return `left: 8px; top: ${getOffsetValue(pos)}px;`;
  } else if (position === 'left center') {
    return `left: ${getOffsetValue(pos)}px; top: 8px;`;
  } else if (position === 'right center') {
    return `right: ${getOffsetValue(pos)}px; top: 8px;`;
  }
  return `left: 8px; bottom: ${getOffsetValue(pos)}px;`;
};

export const Container = styled.div`
  position: fixed;
  ${props => getPosition(props)} width: 56px;
  height: 56px;
  z-index: 110;
  & > div:first-child > div > i:first-child {
    transition: all 0.3s;
    opacity: ${props => (props.open ? 0 : 1)};
    transform: scale(${props => (props.open ? 0 : 1)});
  }
  & > div:first-child > div > i:last-child {
    transition: all 0.3s;
    opacity: ${props => (props.open ? 1 : 0)};
    transform: scale(${props => (props.open ? 1 : 0)});
  }

  @media (max-width: 580px) {
    right: 20px;
    bottom: 20px;
  }
`;

export const Badge = styled.div`
  position: relative;
  ${({ count }) =>
    count &&
    `
    &::after {
      content: '${count}';
      z-index: 112;
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: -4px;
      right: -6px;
      height: var(--space-lg);
      min-height: var(--space-lg);
      min-width: var(--space-lg);
      padding: 0 var(--space-xs);
      border-radius: calc(var(--space-lg) / 2);
      background-color: var(--accent1);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      font-family: var(--mainFont);
      font-size: var(--font-sm);
      font-weight: var(--bold);
    }
  `};
`;

export const BigFab = styled(Tooltip)`
  position: relative;
  z-index: 111;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background-color: var(--primary2);
  transition: all 0.3s;
  display: flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 3px var(--grey1);
  cursor: pointer;

  > i {
    position: absolute;
    top: 18px;
    bottom: 18px;
    left: 18px;
    right: 18px;
  }

  i[class*='fa-'] {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-xl);
    text-align: center;
    color: var(--white);
  }
`;

export const SmallFab = styled(Tooltip)`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: var(--primary2-hover);
  }
  &:active {
    background-color: var(--primary2-active);
  }

  i[class*='fa-'] {
    font-size: var(--font-md);
    text-align: center;
    color: var(--white);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  ${props => getItemOffset(props)} z-index: 110;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--primary2);
  transition: all 0.3s;
  align-items: center;
  display: flex !important;
  justify-content: center;
  box-shadow: 1px 1px 3px var(--grey1);
  opacity: ${({ pos }) => (pos ? 1 : 0)};
`;
