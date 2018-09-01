import React from 'react';
import { string, exact } from 'prop-types';

import { Link } from 'react-router-dom';
import { Container, Header, Logo, StyledAvatar, HeaderTexts, Role, Name, Time, Description, Footer } from './styles';

const InitiativeCard = ({ name, role, time, image, description, shortUrl }) => (
  <Container>
    <Header>
      {image ? <Logo src={image} alt={`Logo inicjatywy ${name}`} /> : <StyledAvatar size="96" name={name} />}
      <HeaderTexts>
        <Role>{role}</Role>
        <Name>{name}</Name>
        <Time>{`${time.from} - ${time.to}`}</Time>
      </HeaderTexts>
    </Header>
    <Description>{description}</Description>
    <Footer>
      <Link className="ant-btn ant-btn-primary" to={`/inicjatywy/${shortUrl}/profil`}>
        Panel inicjatywy
      </Link>
    </Footer>
  </Container>
);

InitiativeCard.propTypes = {
  name: string.isRequired,
  role: string,
  time: exact({
    from: string.isRequired,
    to: string.isRequired,
  }).isRequired,
  image: string,
  description: string.isRequired,
  shortUrl: string.isRequired,
};

InitiativeCard.defaultProps = {
  role: 'Członek inicjatywy',
  time: { from: '01-2018', to: 'obecnie' },
  image: null,
};

export default InitiativeCard;
