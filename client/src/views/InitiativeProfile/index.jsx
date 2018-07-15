import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class MyComponentName extends PureComponent {
  constructor(props) {
    super(props);
    window.disableHomeAnimation = true;
  }

  componentWillUnmount() {
    setTimeout(() => {
      window.disableHomeAnimation = false;
    }, 100);
  }

  render() {
    return <Container>{this.props.match.params.initiative}</Container>;
  }
}

MyComponentName.propTypes = {
  text: string,
};

MyComponentName.defaultProps = {
  text: 'Hello World',
};

export default MyComponentName;
