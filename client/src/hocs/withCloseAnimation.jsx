import React, { PureComponent } from 'react';
import { bool } from 'prop-types';

const withCloseAnimation = WrappedComponent =>
  class Wrapper extends PureComponent {
    static propTypes = {
      visible: bool,
    };

    state = {
      visible: this.props.visible,
    };

    componentDidUpdate() {
      if (!this.props.visible && this.state.visible) {
        setTimeout(() => this.setState({ visible: false }), 300);
      } else if (this.props.visible && !this.state.visible) {
        this.setState({ visible: true });
      }
    }

    render() {
      return this.state.visible ? <WrappedComponent {...this.props} /> : null;
    }
  };

export default withCloseAnimation;
