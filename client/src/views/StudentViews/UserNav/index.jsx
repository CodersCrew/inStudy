import React from 'react';
import { Container, Item } from './styles';

const UserNav = () => (
  <Container>
    <Item to="/student/profil" activeClassName="active" exact>
      <span className="fal fa-id-card" />
      <span>Profil</span>
    </Item>
    <Item to="/student/profil/inicjatywy" activeClassName="active">
      <span className="fal fa-users" />
      <span>Inicjatywy</span>
    </Item>
    {/* <Item to="/student/profil/wydarzenia" activeClassName="active">
      <span className="fal fa-calendar-alt" />
      <span>Wydarzenia</span>
    </Item>
    <Item to="/student/profil/osiagniecia" activeClassName="active">
      <span className="fal fa-award" />
      <span>Osiągnięcia</span>
    </Item> */}
  </Container>
);

export default UserNav;
