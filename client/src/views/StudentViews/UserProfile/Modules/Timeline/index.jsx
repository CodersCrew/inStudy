import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Timeline = ({ text }) => (
	<Container>{text}</Container>
);

Timeline.propTypes = {
  text: string,
};

Timeline.defaultProps = {
  text: 'Moduł oś czasu',
};

export default Timeline;
