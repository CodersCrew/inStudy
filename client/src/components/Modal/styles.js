import styled from 'styled-components';

const getOverlayAnimation = ({ animationName, animationType, duration }) =>
  `modal-${animationName}-${animationType} ${duration > 0 ? duration + 200 : 0}ms`;

const getDialogAnimation = ({ animationName, animationType, duration }) =>
  `modal-${animationName}-${animationType} ${duration}ms`;

const getOversize = ({ overSize }) => {
  if (overSize) {
    return `
      align-self: flex-start;
      &:focus { outline: none; }
    `;
  }
};

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  visibility: ${props => !props.isShow && 'hidden'};
  align-items: center;
  justify-content: center;
  transition: all ${props => props.duration}ms cubic-bezier(0.4, 0, 0, 1.5);

  > div:last-child > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:first-child {
    transition: all ${props => props.duration}ms cubic-bezier(0.4, 0, 0, 1.5);
    animation: ${props => getOverlayAnimation(props)} both cubic-bezier(0.4, 0, 0, 1.5);
  }
`;

export const Mask = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

export const Dialog = styled.div`
  position: relative;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  max-width: calc(100vw - var(--space-xl));
  margin: var(--space-xl) 0;
  z-index: 101;
  border-left: 4px solid ${props => props.color};
  padding: var(--space-lg);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${props => getDialogAnimation(props)} both cubic-bezier(0.4, 0, 0, 1.5) 100ms;
  ${props => getOversize(props)};
`;

export const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  font-size: var(--font-sm);
  color: var(--text3);
  font-weight: var(--fa-light);
`;

export const Header = styled.div`
  display: flex;
  padding-bottom: var(--space-md);

  svg {
    margin-right: var(--space-md);
  }
`;

export const Title = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;

export const Content = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;

export const Footer = styled.div`
  margin-top: var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > button:not(:first-child) {
    margin-left: var(--space-md);
  }
`;
