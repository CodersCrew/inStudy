import React, { PureComponent, Fragment } from 'react';
import { string } from 'prop-types';

const getClassName = ({ isShowed, transition }) => {
  if (isShowed && transition) {
    return 'exiting';
  } else if (!isShowed && transition) {
    return 'entering';
  } else if (isShowed && !transition) {
    return 'entered';
  }

  return 'exited';
};

class TransitionClass extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.animatedStart) {
      this.state = {
        isShowed: !this.props.isShowed,
        transition: true,
      };
      this.transitionTimeout();
    } else {
      this.state = {
        isShowed: this.props.isShowed,
        transition: false,
      };
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isShowed !== state.isShowed) {
      return { transition: true };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.transition) {
      this.transitionTimeout();
    }
  }

  transitionTimeout = () => {
    window.setTimeout(() => {
      this.setState({ transition: false, isShowed: this.props.isShowed });
    }, this.props.duration);
  };

  render() {
    const className = getClassName(this.state);

    return className === 'exited' && this.props.unmountOnExit ? null : (
      <Fragment>{this.props.children(className)}</Fragment>
    );
  }
}

TransitionClass.propTypes = {
  text: string,
};

TransitionClass.defaultProps = {
  text: 'Hello World',
};

export default TransitionClass;
