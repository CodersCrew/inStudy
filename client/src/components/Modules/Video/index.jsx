import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Video = ({ text }) => (
  <Container>{text}</Container>
);

Video.propTypes = {
  text: string,
};

Video.defaultProps = {
  text: 'Moduł video',
};

export default Video;
