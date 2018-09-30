import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const RichText = ({ description }) => (
  <Container dangerouslySetInnerHTML={{ __html: description }} />
);

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Moduł tekst',
};

export default RichText;
