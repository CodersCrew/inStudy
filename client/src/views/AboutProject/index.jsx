import React from 'react';
import styled from 'styled-components';
import Slogan from './Slogan';
import Text from './Text';
import Priorities from './Priorities';
import Team from './Team';

const Container = styled.div`
  padding-bottom: 96px;
`;

const AboutProject = () => (
  <Container>
    <Slogan />
    <Text />
    <Priorities />
    <Team />
  </Container>
);

export default AboutProject;
