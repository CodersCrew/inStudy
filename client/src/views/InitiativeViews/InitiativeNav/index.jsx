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
        isActive={() => checkActive(pathname, 'profil')}
      >
        <span className="fal fa-id-card" />
        <span>Profil</span>
      </Item>
      {/* <Item
        to={`/inicjatywy/${shortUrl}/czlonkowie`}
        activeClassName="active"
        isActive={() => checkActive(pathname, 'czlonkowie')}
      >
        <span className="fal fa-users" />
        <span>Członkowie</span>
      </Item>
      <Item
        to={`/inicjatywy/${shortUrl}/projekty`}
        activeClassName="active"
        isActive={() => checkActive(pathname, 'projekty')}
      >
        <span className="fal fa-rocket" />
        <span>Projekty</span>
      </Item>
      <Item
        to={`/inicjatywy/${shortUrl}/rekrutacja`}
        activeClassName="active"
        isActive={() => checkActive(pathname, 'rekrutacja')}
      >
        <span className="fal fa-user-plus" />
        <span>Rekrutacja</span>
      </Item> */}
    </Container>
  );
};

InitiativeNav.propTypes = {
  location: object.isRequired,
}

export default withRouter(InitiativeNav);
