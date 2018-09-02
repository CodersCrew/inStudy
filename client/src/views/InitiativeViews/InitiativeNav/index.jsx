import React from 'react';
import { Container, Item } from './styles';

const InitiativeNav = () => (
  <Container>
    <Item to="/student/profil" activeClassName="active" exact>
      Profil
    </Item>
    <Item to="/student/profil/inicjatywy" activeClassName="active">
      Członkowie
    </Item>
    <Item to="/student/profil/wydarzenia" activeClassName="active">
      Projekty
    </Item>
    <Item to="/student/profil/osiagniecia" activeClassName="active">
      Rekrutacja
    </Item>
  </Container>
);

export default InitiativeNav;
