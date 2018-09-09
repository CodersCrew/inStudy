import React from 'react';
import { string, array } from 'prop-types';
import { Container, NumberContainer, NumberValue, Line, Title} from './styles';

const Number = ({ number, title }) => (
  <NumberContainer>
    <NumberValue>{number}</NumberValue>
    <Line />
    <Title>{title}</Title>
  </NumberContainer>
);

Number.defaultProps = {
  number: string.isRequired,
  title: string.isRequired,
};

const Numbers = ({ items }) => (
  <Container>
    {items.map(item => item && <Number key={item.title} {...item} />)}
  </Container>
);

Numbers.propTypes = {
  items: array.isRequired,
};

export default Numbers;
