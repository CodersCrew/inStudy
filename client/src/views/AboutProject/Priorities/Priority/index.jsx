import React from 'react';
import { string } from 'prop-types';
import { Container, Icon, Title, Description } from './styles';

const Priority = ({ title, desctiption, icon }) => (
  <Container>
    <Icon className={`fal fa-${icon}`} />
    <Title>{title}</Title>
    <Description>{desctiption}</Description>
  </Container>
);

Priority.propTypes = {
  title: string.isRequired,
  desctiption: string.isRequired,
  icon: string.isRequired,
};

export default Priority;
