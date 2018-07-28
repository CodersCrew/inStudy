import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import TriangleBackground from '../../components/TriangleBackground';
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
    return (
      <Container>
        {this.props.match.params.initiative}
        <TriangleBackground />
      </Container>
    );
  }
}

MyComponentName.propTypes = {
  text: string,
};

MyComponentName.defaultProps = {
  text: 'Hello World',
};

export default MyComponentName;
