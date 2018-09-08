import React, { PureComponent } from 'react';
import { Container } from './styles';

class Policy extends PureComponent {
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
    return <Container>Statute</Container>;
  }
}

export default Policy;
