import React from 'react';
import { Container, Icon, Image, StyledTooltip } from './styles';

const Logo = ({ image, title, url }) => (
  <StyledTooltip title={title} duration={300} distance={-10}>
    <Icon href={url} rel="nofollow">
      <Image src={image} />
    </Icon>
  </StyledTooltip>
);

const Logos = ({ items }) => (
  <Container>
    {items.map(Logo)}
  </Container>
);

export default Logos;
