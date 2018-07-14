import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import { Container } from './styles';

import '../../styles/main.scss';

const goToGoogleLogin = () => {
  window.location.assign('/auth/google');
};

@connect(
  ({ auth }) => ({ auth }),
  { logout },
)
class Navbar extends PureComponent {
  render() {
    return (
      <Container>
        {this.props.auth === false ? (
          <button onClick={goToGoogleLogin}>Zaloguj</button>
        ) : (
          <Fragment>
            <img alt="user-image" src={this.props.auth && this.props.auth.image} />
            <button onClick={this.props.logout}>Wyloguj</button>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default Navbar;
