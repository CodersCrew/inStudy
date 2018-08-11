import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Contact = ({ text }) => (
	<Container>{text}</Container>
);

Contact.propTypes = {
  text: string,
};

Contact.defaultProps = {
  text: 'Moduł kontakt',
};

export default Contact;
