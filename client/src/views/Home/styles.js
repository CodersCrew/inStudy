import styled from 'styled-components';
import Typist from 'react-typist';
import { media } from 'react-ui-framework/lib/utils';

const HeaderStyles = `
  user-select: none;
  font-size: 52px;
  line-height: 1;
  font-weight: var(--bold);
  font-family: var(--headerFont);
  margin-bottom: var(--space-xxl);
  transition: all 1s var(--ease-out);
`;

export const Container = styled.div`
  z-index: 0;
  position: relative;
  height: ${props => (props.resized ? '280px' : '100%')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary2);
  transition: all 2s var(--ease-out);

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
    top: ${props => (props.resized ? 0 : -32)};
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

  > div:first-of-type {
    font-size: ${props => props.resized && '0px !important; margin: 0px !important'};
    ${media.lg`font-size: 40px; margin-bottom: var(--space-xl);`};
    ${media.md`
      font-size: var(--font-xxl);

      @media (orientation: landscape) {
        top: 0;
      }
    `};
    ${media.sm`line-height: 1.3; min-height: 82px;`};
    ${media.xs`margin-bottom: var(--space-md); font-size: var(--font-xl); min-height: 62px;`};

    p {
      font-size: ${props => props.resized && '0px !important; margin: 0px !important'};
    }
  }
`;

export const Supheader = styled.p`
  user-select: none;
  padding-bottom: var(--space-xl);
  font-size: var(--font-xxl);
  font-weight: var(--regular);
  font-family: var(--headerFont);
  color: #fff;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: all 0.3s linear;
  ${media.lg`font-size: var(--font-xl); padding-bottom: var(--space-lg);`};
  ${media.sm`font-size: var(--font-lg); padding-bottom: var(--space-md);`};
  ${media.xs`font-size: var(--font-md); padding-bottom: var(--space-sm);`};
`;

export const Header = styled(Typist)`
  ${HeaderStyles};

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

export const Filler = styled.p`
  ${HeaderStyles};
`;
