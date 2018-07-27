import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NavItems from './NavItems';
import Search from './Search';
import User from './User';
import { Container, Logo, Line, Right } from './styles';

@withRouter
@connect(state => ({ sizeName: state.ui.size.name }))
class Navbar extends PureComponent {
  render() {
    return (
      <Container>
        <Link
          to="/"
          onClick={() => {
            window.resizeHomeUp = this.props.location.pathname.includes('inicjatywy');
          }}
        >
          {this.props.sizeName === 'xs' ? (
            <Logo path="/img/sygnet_bialy.svg" width={21} height={16} fill="#fff" />
          ) : (
            <Logo path="/img/logo_poziomo_biale.svg" width={80} height={24} fill="#fff" />
          )}
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
  }
}

export default Navbar;
