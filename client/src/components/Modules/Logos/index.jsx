import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Logos = (props) => {
  console.log(props);
  return (
    <Container>{props.text}</Container>
  );
};

Logos.propTypes = {
  text: string,
};

Logos.defaultProps = {
  text: 'Moduł loga',
};

export default Logos;
