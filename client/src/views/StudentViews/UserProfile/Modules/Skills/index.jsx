import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Skills = ({ text }) => (
	<Container>{text}</Container>
);

Skills.propTypes = {
  text: string,
};

Skills.defaultProps = {
  text: 'Moduł umiejętności',
};

export default Skills;
