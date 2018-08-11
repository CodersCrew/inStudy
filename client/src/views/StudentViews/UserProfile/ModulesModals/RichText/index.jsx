import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class RichText extends PureComponent {
  render() {
    return (
      <Container>{this.props.text}</Container>
    );
  }
}

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Rich Text',
};

export default RichText;
