import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class Timeline extends PureComponent {
  render() {
    return (
      <Container>{this.props.text}</Container>
    );
  }
}

Timeline.propTypes = {
  text: string,
};

Timeline.defaultProps = {
  text: 'Timeline',
};

export default Timeline;
