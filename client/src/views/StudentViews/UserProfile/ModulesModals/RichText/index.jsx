import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

class RichText extends PureComponent {
  render() {
    return <this.props.Field name="description">{this.props.text}</this.props.Field>;
  }
}

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Rich Text',
};

export default RichText;
