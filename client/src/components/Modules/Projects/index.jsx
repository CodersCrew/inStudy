import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Projects = ({ text }) => (
  <Container>{text}</Container>
);

Projects.propTypes = {
  text: string,
};

Projects.defaultProps = {
  text: 'Moduł projekty',
};

export default Projects;
