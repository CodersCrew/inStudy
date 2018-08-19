import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class Skills extends PureComponent {
  render() {
    return (
      <Container>{this.props.text}</Container>
    );
  }
}

Skills.propTypes = {
  text: string,
};

Skills.defaultProps = {
  text: 'Skills',
};

export default Skills;
