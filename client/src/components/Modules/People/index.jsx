import React from 'react';
import { string, oneOfType, object, array } from 'prop-types';
import socialsList from 'data/socials';
import {
  Container,
  SocialWrapper,
  Link,
  Icon,
  PersonContainer,
  ImageContent,
  Wrapper,
  Image,
  Overlay,
  Description,
  Socials,
  Name,
  Title,
} from './styles';

const Social = social => (social.socialType && social.url) ? (
  <SocialWrapper>
    <Link href={social.url}>
      <Icon className={socialsList[social.socialType].icon} />
    </Link>
  </SocialWrapper>
) : null;

Social.propTypes = {
  socialType: string.isRequired,
  url: string.isRequired,
};

const Person = ({ image, firstName, lastName, title, description, socials }) => (
  <PersonContainer>
    <ImageContent>
      <Wrapper>
        <Image src={image} alt={`${firstName} ${lastName} - zdjęcie`} />
        <Overlay>
          <Description>{description}</Description>
          <Socials>
            {socials.map(social => social && <Social key={social.url} {...social} />)}
          </Socials>
        </Overlay>
      </Wrapper>
    </ImageContent>
    <Name>{`${firstName} ${lastName}`}</Name>
    <Title>{title}</Title>
  </PersonContainer>
);

Person.propTypes = {
  image: oneOfType([object, string]),
  firstName: string.isRequired,
  lastName: string.isRequired,
  title: string,
  description: string,
  socials: array,
};

const People = ({ items }) => (
  <Container>
    {items.map(Person)}
  </Container>
);

People.propTypes = {
  items: array.isRequired,
};

export default People;
