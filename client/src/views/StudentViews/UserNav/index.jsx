import React from 'react';
import { Container, Item } from './styles';

const UserNav = () => (
  <Container>
    <Item to="/student/profil" activeClassName="active" exact>
      Profil
    </Item>
    <Item to="/student/profil/inicjatywy" activeClassName="active">
      Inicjatywy
    </Item>
    <Item to="/student/profil/wydarzenia" activeClassName="active">
      Wydarzenia
    </Item>
    <Item to="/student/profil/osiagniecia" activeClassName="active">
      Osiągnięcia
    </Item>
  </Container>
);

export default UserNav;
