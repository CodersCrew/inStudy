import React, { PureComponent, Fragment } from 'react';
import { oneOf, bool, exact, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-ui-framework';
import tooltipConfig from '../tooltipConfig';
import { logout } from '../../../store/actions';
import { MenuItem } from '../Menu';
import { StyledButton, UserImage } from './styles';

const goToGoogleLogin = () => {
  window.location.assign('/auth/google');
};

@connect(
  ({ auth, ui }) => ({ auth, sizeName: ui.size.name }),
  { logout },
)
class User extends PureComponent {
  render() {
    const buttonContent =
      this.props.sizeName === 'xs' ? <span className="fas fa-user" /> : <span>Moje konto</span>;

    return (
      <Fragment>
        {this.props.auth === false ? (
          <StyledButton ghost size="xs" kind="white" onClick={goToGoogleLogin}>
            {buttonContent}
          </StyledButton>
        ) : (
          <Fragment>
            <Tooltip
              html={<MenuItem text="Wyloguj się" onClick={this.props.logout} />}
              trigger="click"
              {...tooltipConfig}
            >
              <UserImage src={this.props.auth && this.props.auth.image} />
            </Tooltip>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

User.propTypes = {
  auth: oneOf([
    bool,
    exact({
      image: string.isRequired,
      googleId: string.isRequired,
      _id: string.isRequired,
    }),
  ]),
  logout: func,
};

User.defaultProps = {
  auth: null,
};

export default User;
