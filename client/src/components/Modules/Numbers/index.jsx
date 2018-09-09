import React from 'react';
import { string, array } from 'prop-types';
import { Container, NumberContainer, NumberValue, Line, Title } from './styles';

const NumberItem = ({ number, title }) => (
  <NumberContainer>
    <NumberValue>{number}</NumberValue>
    <Line />
    <Title>{title}</Title>
  </NumberContainer>
);

NumberItem.propTypes = {
  number: string.isRequired,
  title: string.isRequired,
};

const Numbers = ({ items }) => (
  <Container>
    {items.map(item => item && <NumberItem key={item.title} {...item} />)}
  </Container>
);

Numbers.propTypes = {
  items: array.isRequired,
};

export default Numbers;
