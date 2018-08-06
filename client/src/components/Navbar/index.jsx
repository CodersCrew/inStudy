import React from 'react';
import { object, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NavItems from './NavItems';
import Search from './Search';
import User from './User';
import { Container, Logo, Line, Right } from './styles';

const setResize = ({ pathname }) => {
  window.resizeHomeUp = pathname === '/inicjatywy';
};

const Navbar = ({ location, sizeName }) => {
  const logoData =
    sizeName === 'xs'
      ? { path: '/img/sygnet_bialy.svg', width: 21, height: 16 }
      : { path: '/img/logo_poziomo_biale.svg', width: 80, height: 24 };

  return (
    <Container>
      <Link to="/" onClick={() => setResize(location)}>
        <Logo {...logoData} fill="#fff" />
      </Link>
      <Line />
      <NavItems />
      <Right>
        <Search />
        <Line />
        <User />
      </Right>
    </Container>
  );
};

Navbar.propTypes = {
  location: object.isRequired,
  sizeName: string.isRequired,
};

export default withRouter(connect(state => ({ sizeName: state.ui.size.name }))(Navbar));
