import styled, { keyframes } from 'styled-components';
import Typist from 'react-typist';
import { media } from 'react-ui-framework/lib/utils';

const sizeDown = keyframes`
  from {
    height: 100%;
  }

  to {
    height: 280px;
  }
`;

export const Container = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary2);

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

  > div {
    position: relative;
    top: ${props => (props.resized ? 0 : '-32px')};
  }

  &.entering {
    animation: ${sizeDown} 1s var(--ease-in-out);
    animation-fill-mode: forwards;
    animation-direction: reverse;
  }

  &.entered {
    height: 100%;
  }

  &.exiting {
    animation: ${sizeDown} 1s var(--ease-in-out);
    animation-fill-mode: forwards;
  }

  &.exited {
    height: 280px;
  }
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 0 var(--space-xl);
  text-align: center;
  color: #fff;
  ${media.xs`padding: 0 var(--space-md);`};
`;

export const Supheader = styled.p`
  user-select: none;
  padding-bottom: var(--space-xl);
  font-size: var(--font-xxl);
  font-weight: var(--regular);
  font-family: var(--headerFont);
  color: #fff;
  opacity: 1;
  transition: all 0.3s linear;
  ${media.lg`font-size: var(--font-xl); padding-bottom: var(--space-lg);`};
  ${media.sm`font-size: var(--font-lg); padding-bottom: var(--space-md);`};
  ${media.xs`font-size: var(--font-md); padding-bottom: var(--space-sm);`};
`;

const enteredHeaderStyles = `
  opacity: 1;
  ${media.lg`
    box-sizing: border-box;
    font-size: 40px;
    margin-bottom: var(--space-xl);
  `}
  ${media.md`
    box-sizing: border-box;
    font-size: var(--font-xxl);
  `}
  ${media.sm`
    box-sizing: border-box;
    line-height: 1.3;
    min-height: 82px;
  `}
  ${media.xs`box-sizing: border-box; margin-bottom: var(--space-md); font-size: var(--font-xl); min-height: 62px;`}
`;

const headerEntering = keyframes`
  from {
    font-size: 0;
    margin: 0;
    opacity: 0;
    min-height: 0;
    line-height: 0;
  }

  to {
    ${enteredHeaderStyles}
  }
`;

export const Header = styled(Typist)`
  user-select: none;
  line-height: 1;
  font-size: 52px;
  font-weight: var(--bold);
  font-family: var(--headerFont);
  margin-bottom: var(--space-xxl);
  ${media.md`
    @media (orientation: landscape) {
      top: 0;
    }
  `};

  &.entered {
    ${enteredHeaderStyles};
  }

  &.entering {
    animation: ${headerEntering} 0.3s var(--ease-out);
    animation-fill-mode: forwards;
    animation-direction: reverse;
  }

  &.exited {
    font-size: 0;
    margin: 0;
    opacity: 0;
    min-height: 0;
  }

  &.exiting {
    animation: ${headerEntering} 0.3s var(--ease-out);
    animation-fill-mode: forwards;
  }

  .Cursor {
    display: inline-block;

    &--blinking {
      opacity: 1;
      animation: blink 1s linear infinite;

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
`;
