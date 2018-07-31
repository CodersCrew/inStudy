import React from 'react';
import { string } from 'prop-types';

const MyComponentName = ({ text }) => (
	<div>{text}</div>
);

MyComponentName.propTypes = {
  text: string,
};

MyComponentName.defaultProps = {
  text: 'Card',
};

export default MyComponentName;
