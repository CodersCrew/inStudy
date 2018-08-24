import React, { PureComponent } from 'react';
import { string, array, node, oneOf, func, number, bool, object } from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Mask } from './styles';
import SimpleDialog from './Simple';
import ComplexDialog from './Complex';
import ConfirmationDialog from './Confirmation';

class Modal extends PureComponent {
  state = {
    isShow: false,
    animationType: 'leave',
  };

  componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  UNSAFE_componentWillReceiveProps({ visible }) {
    const [isVisible, wasVisible] = [visible, this.props.visible];
    if (!wasVisible && isVisible) this.enter();
    if (wasVisible && !isVisible) this.leave();
  }

  componentDidUpdate({ visible }) {
    if (!visible && this.props.visible) {
      this.scrollbars.scrollToTop();
    }
  }

  onKeyUp = ({ keyCode }) => keyCode === 27 && this.props.onClose();

  enter = () => this.setState({ isShow: true, animationType: 'enter' });

  leave = () => this.setState({ animationType: 'leave' });

  animationEnd = ({ target }) => {
    const {
      state: { animationType },
      props: { onAnimationEnd },
      container,
    } = this;

    if (animationType === 'leave') {
      this.setState({ isShow: false });
    } else {
      container.focus();
    }

    if (target === container && onAnimationEnd) {
      onAnimationEnd();
    }
  };

  render() {
    const {
      props: {
        animation,
        buttons,
        children,
        className,
        color,
        duration,
        enterAnimation,
        icon,
        leaveAnimation,
        onClose,
        showCloseButton,
        style,
        title,
        type,
        width,
      },
      state: { animationType, isShow },
    } = this;
    const animationName =
      (animationType === 'enter' ? enterAnimation : leaveAnimation) || animation;
    const ModalComponent =
      type === 'simple' ? SimpleDialog : type === 'complex' ? ComplexDialog : ConfirmationDialog;

    return isShow ? (
      <Container
        className={className}
        isShow
        duration={duration}
        animationType={animationType}
        animationName={animationName}
        onAnimationEnd={this.animationEnd}
        tabIndex="-1"
        innerRef={container => {
          this.container = container;
        }}
        onKeyUp={this.onKeyUp}
        style={style}
      >
        <Mask key="mask" onClick={onClose} />
        <Scrollbars
          key="scrollbars"
          ref={scrollbars => {
            this.scrollbars = scrollbars;
          }}
        >
          <ModalComponent
            animationName={animationName}
            animationType={animationType}
            buttons={buttons.reverse()}
            color={color}
            duration={duration}
            icon={icon}
            onClose={onClose}
            showCloseButton={showCloseButton}
            title={title}
            width={width}
          >
            {children}
          </ModalComponent>
        </Scrollbars>
      </Container>
    ) : null;
  }
}

Modal.propTypes = {
  animation: oneOf([
    'fade',
    'zoom',
    'slideDown',
    'slideLeft',
    'slideRight',
    'slideUp',
    'flip',
    'rotate',
    'door',
  ]),
  buttons: array,
  children: node.isRequired,
  className: string,
  color: string,
  duration: number,
  enterAnimation: string,
  icon: string,
  leaveAnimation: string,
  onAnimationEnd: func,
  onClose: func.isRequired,
  showCloseButton: bool,
  style: object,
  title: string.isRequired,
  type: oneOf(['simple', 'complex', 'confirmation']),
  visible: bool,
  width: number,
};

Modal.defaultProps = {
  animation: 'fade',
  buttons: [],
  className: '',
  color: 'var(--primary2)',
  duration: 300,
  enterAnimation: '',
  icon: '',
  leaveAnimation: '',
  onAnimationEnd: () => {},
  showCloseButton: true,
  style: {},
  type: 'simple',
  visible: false,
  width: 456,
};

export default Modal;
