import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Traits = (props) => {
  console.log(props);
  return (
    <Container>{props.text}</Container>
  );
}

Traits.propTypes = {
  text: string,
};

Traits.defaultProps = {
  text: 'Moduł cechy',
};

export default Traits;
