import React from 'react';
import { array, string } from 'prop-types';
import { Container, TraitContainer, Icon, Name, Description } from './styles';

const Trait = ({ icon, name, description }) => (
  <TraitContainer>
    <Icon className={`fal fa-${icon}`} />
    <Name>{name}</Name>
    <Description>{description}</Description>
  </TraitContainer>
);

Trait.propTypes = {
  icon: string.isRequired,
  name: string.isRequired,
  description: string.isRequired,
};

const Traits = ({ items }) => {
  console.log(items);
  return (
    <Container>
      {items.map(Trait)}
    </Container>
  );
};

Traits.propTypes = {
  items: array.isRequired,
};

export default Traits;
