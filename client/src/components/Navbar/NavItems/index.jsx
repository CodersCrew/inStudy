import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';
import { Menu, Dropdown } from 'antd';
import { MenuItem } from '../Menu';
import { Container, NavItem, NavItemLink, Icon } from './styles';

const menu = (
  <Menu>
    <Menu.Item>
      <MenuItem text="O projekcie" to="/o-projekcie" />
    </Menu.Item>
    <Menu.Item>
      <MenuItem text="FAQ" to="/faq/ogolne" />
    </Menu.Item>
    <Menu.Item>
      <MenuItem text="Kontakt" to="/contact" />
    </Menu.Item>
  </Menu>
);

const NavItems = ({ location }) => (
  <Container>
    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
      <NavItem style={{ paddingRight: 16 }}>
        O inStudy
        <Icon className="fal fa-angle-down" />
      </NavItem>
    </Dropdown>
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

NavItems.propTypes = {
  location: object.isRequired,
};

export default withRouter(NavItems);
