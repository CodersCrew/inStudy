import styled, { keyframes } from 'styled-components';
import Typist from 'react-typist';
import { media } from 'react-ui-framework/lib/utils';

const toSmaller = keyframes`
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
  height: ${props => (props.isLanding ? '280px' : '100%')};

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
    top: ${props => (props.isLanding ? 0 : '-32px')};
  }

  &.exiting {
    animation: ${toSmaller} 0.6s var(--ease-in-out);
  }

  &.entering {
    animation: ${toSmaller} 0.6s var(--ease-in-out);
    animation-direction: reverse;
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

const hideHeader = keyframes`
  from {
    line-height: 1;
    font-size: 52px;
    margin-bottom: var(--space-xxl);
    opacity: 1;
    ${media.lg`
      font-size: 40px;
      margin-bottom: var(--space-xl);
    `}
    ${media.md`
      font-size: var(--font-xxl);
    `}
    ${media.sm`
      line-height: 1.3;
      min-height: 82px;
    `}
    ${media.xs`margin-bottom: var(--space-md); font-size: var(--font-xl); min-height: 62px;`}
  }

  to {
    font-size: 0;
    margin: 0;
    line-height: 0;
  }
`;

export const Header = styled(Typist)`
  user-select: none;
  line-height: 1;
  font-size: 52px;
  font-weight: var(--bold);
  font-family: var(--headerFont);
  margin-bottom: var(--space-xxl);
  opacity: 1;
  ${media.lg`
    font-size: 40px;
    margin-bottom: var(--space-xl);
  `}
  ${media.md`
    font-size: var(--font-xxl);

    @media (orientation: landscape) {
      top: 0;
    }
  `}
  ${media.sm`
    line-height: 1.3;
    min-height: 82px;
  `}
  ${media.xs`margin-bottom: var(--space-md); font-size: var(--font-xl); min-height: 62px;`}

  &.exiting {
    animation: ${hideHeader} 0.6s var(--ease-in-out);
  }

  &.entering {
    animation: ${hideHeader} 0.6s var(--ease-in-out);
    animation-direction: reverse;
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
