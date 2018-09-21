import React from 'react';
import { string } from 'prop-types';
import { Container, Image, Name, Role } from './styles';

const Member = ({ name, role, image }) => (
  <Container>
    <Image src={image} />
    <Name className="text">{name}</Name>
    <Role className="subtext">{role}</Role>
  </Container>
);

Member.propTypes = {
  name: string,
  role: string,
  image: string,
};

export default Member;
