import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { oneOf, string, number, object, func } from 'prop-types';

const goToGoogleLogin = () => {
  window.location.assign('/auth/google');
};

@connect(
  ({ auth }) => ({ auth }),
  { logout },
)
class Home extends PureComponent {
  render() {
    return this.props.auth === false ? (
      <button onClick={goToGoogleLogin}>Zaloguj</button>
    ) : (
      <Fragment>
        <img alt="user-image" src={this.props.auth && this.props.auth.image} />
        <button onClick={this.props.logout}>Wyloguj</button>
      </Fragment>
    );
  }
}

Home.propTypes = {
  auth: oneOf([null, false, { googleId: string, __v: number, _id: string }]),
  logout: func,
  history: object,
};

export default Home;
