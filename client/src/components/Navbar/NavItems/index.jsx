import React from 'react';
import { withRouter } from 'react-router';
import { Tooltip } from 'react-ui-framework';
import { MenuItems, MenuItem } from '../Menu';
import tooltipConfig from '../tooltipConfig';
import { Container, NavItem, NavItemLink, Icon } from './styles';

const NavItems = ({ location }) => (
  <Container>
    <Tooltip
      key="tooltip"
      offset={8}
      distance={16}
      useContext
      html={
        <MenuItems>
          <MenuItem text="O projekcie" to="/about" />
          <MenuItem text="FAQ" to="/faq" />
          <MenuItem text="Kontakt" to="/contact" />
        </MenuItems>
      }
      {...tooltipConfig}
    >
      <NavItem style={{ paddingRight: 16 }}>
        O inStudy
        <Icon className="fal fa-angle-down" />
      </NavItem>
    </Tooltip>
    <NavItemLink
      to="/inicjatywy"
      onClick={() => {
        window.resizeHomeDown = location.pathname === '/';
      }}
    >
      Inicjatywy
    </NavItemLink>
  </Container>
);

export default withRouter(NavItems);
