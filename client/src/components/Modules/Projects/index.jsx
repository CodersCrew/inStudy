import React from 'react';
import { string, oneOfType, object, array } from 'prop-types';
import socialsList from 'data/socials';
import { Container, ProjectContainer, Card, Text, Name, Header, StyledButton } from './styles';

const ProjectImage = ({ image }) => (
  <img src={(typeof image === 'string') ? image : image?.preview} />
);

ProjectImage.propTypes = {
  image: oneOfType([object, string]).isRequired,
};

const Social = ({ socialType, url }) => (
  <i className={socialsList[socialType].icon} />
);

Social.propTypes = {
  socialType: string.isRequired,
  url: string.isRequired,
};

const Project = ({ name, header, description, image, images, socials }) => (
  <ProjectContainer>
    <div>
      <Card src={image} />
      <Text>
        <Name>{name}</Name>
        <Header>{header}</Header>
      </Text>
      <StyledButton type="primary">Więcej</StyledButton>
    </div>
    {/* <img src={(typeof image === 'string') ? image : image?.preview} alt={`Logo projektu ${name}`} />
    <div>{name}</div>
    <div>{header}</div>
    <div>{description}</div>
    <div>
      {images.map(image => image && <ProjectImage key={(typeof image.image === 'string') ? image.image : image.image.preview} {...image} />)}
    </div>
    <div>
      {socials.map(social => social && <Social key={social.url} {...social} />)}
    </div> */}
  </ProjectContainer>
);

Project.propTypes = {
  name: string.isRequired,
  header: string,
  description: string.isRequired,
  image: oneOfType([object, string]).isRequired,
  images: array,
  socials: array,
};

const Projects = ({ items }) => (
  <Container>
    {items.map(Project)}
  </Container>
);

Projects.propTypes = {
  items: array.isRequired,
};

export default Projects;
