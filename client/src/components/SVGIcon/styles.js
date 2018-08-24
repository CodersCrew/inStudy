import styled from 'styled-components';
import ReactSVG from 'react-svg';

export default styled(ReactSVG)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
    transition: all 0.3s var(--ease-in-out);
  }

  svg,
  path,
  circle,
  use {
    fill: ${props => props.fill};
  }
`;
