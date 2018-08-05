import React from 'react';
import { string, arrayOf, object } from 'prop-types';
import { Container, Image, Name, Description, Socials, Social } from './styles';

const renderSocial = ({ link, iconName }) => <Social to={link} className={`fab fa-${iconName}`} />;
renderSocial.propTypes = {
  link: string.isRequired,
  iconName: string.isRequired,
};

const Card = ({ image, firstName, lastName, description, socials }) => (
  <Container>
    <Image src={image} />
    <Name>{`${firstName} ${lastName}`}</Name>
    <Description>{description}</Description>
    <Socials>{socials.map(renderSocial)}</Socials>
  </Container>
);

Card.propTypes = {
  image: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  description: string,
  socials: arrayOf(object),
};

Card.defaultProps = {
  description: '',
  socials: [],
};

export default Card;
