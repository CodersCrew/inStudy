import React from 'react';
import { oneOfType, string, object, array } from 'prop-types';
import { Container, Icon, Image, StyledTooltip } from './styles';

const Logo = ({ image, title, url }) => (
  <StyledTooltip title={title} duration={300} distance={-10}>
    <Icon href={url} rel="nofollow">
      <Image src={typeof image === 'string' ? image : image.preview} />
    </Icon>
  </StyledTooltip>
);

Logo.propTypes = {
  image: oneOfType([string, object]).isRequired,
  title: string.isRequired,
  url: string.isRequired,
};

const Logos = ({ items }) => (
  <Container>
    {items.map(Logo)}
  </Container>
);

Logos.propTypes = {
  items: array,
};

export default Logos;
