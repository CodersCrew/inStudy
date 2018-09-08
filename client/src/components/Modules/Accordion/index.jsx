import React from 'react';
import { string } from 'prop-types';
import { Container } from './styles';

const Accordion = (props) => {
  console.log(props);
  return (
    <Container>{props.text}</Container>
  );
}

Accordion.propTypes = {
  text: string,
};

Accordion.defaultProps = {
  text: 'Moduł lista rozwijana',
};

export default Accordion;
