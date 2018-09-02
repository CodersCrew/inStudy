import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Item } from './styles';

const checkActive = (pathname, viewName) => {
  const pathnameArr = pathname.split('/');
  return pathnameArr[1] === 'inicjatywy' && pathnameArr[3] === viewName;
};

const InitiativeNav = ({ location: { pathname } }) => {
  const shortUrl = pathname.split('/')[2];
  return (
    <Container>
      <Item
        to={`/inicjatywy/${shortUrl}/profil`}
        activeClassName="active"
        isActive={(match, { pathname }) => checkActive(pathname, 'profil')}
      >
        Profil
      </Item>
      <Item
        to={`/inicjatywy/${shortUrl}/czlonkowie`}
        activeClassName="active"
        isActive={(match, { pathname }) => checkActive(pathname, 'czlonkowie')}
      >
        Członkowie
      </Item>
      <Item
        to={`/inicjatywy/${shortUrl}/projekty`}
        activeClassName="active"
        isActive={(match, { pathname }) => checkActive(pathname, 'projekty')}
      >
        Projekty
      </Item>
      <Item
        to={`/inicjatywy/${shortUrl}/rekrutacja`}
        activeClassName="active"
        isActive={(match, { pathname }) => checkActive(pathname, 'rekrutacja')}
      >
        Rekrutacja
      </Item>
    </Container>
  );
};

InitiativeNav.propTypes = {
  location: object.isRequired,
}

export default withRouter(InitiativeNav);
