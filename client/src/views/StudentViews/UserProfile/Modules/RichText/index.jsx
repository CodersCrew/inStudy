import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const RichText = ({ text }) => (
	<Container>{text}</Container>
);

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Moduł tekst',
};

export default RichText;
