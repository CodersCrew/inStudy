import React, { PureComponent, Fragment } from 'react';
import { oneOf, bool, exact, string, func } from 'prop-types';
import { connect } from 'react-redux';
import tooltipConfig from '../tooltipConfig';
import { logout } from '../../../store/actions';
import { MenuItems, MenuItem } from '../Menu';
import { StyledButton, UserImage, StyledTooltip } from './styles';

const goToGoogleLogin = () => {
  window.location.assign('/auth/google');
};

const goToProfile = () => {
  window.location.assign('/student/profil');
};

@connect(
  ({ auth, ui }) => ({ auth, sizeName: ui.size.name }),
  { logout },
)
class User extends PureComponent {
  render() {
    const { sizeName, logout, auth } = this.props;
    const buttonContent =
      sizeName === 'xs' ? <span className="fas fa-user" /> : <span>Moje konto</span>;

    return (
      <Fragment>
        {auth === false ? (
          <StyledButton ghost size="xs" kind="white" onClick={goToGoogleLogin}>
            {buttonContent}
          </StyledButton>
        ) : (
          <StyledTooltip
            html={
              <MenuItems>
                <MenuItem text="Mój profil" onClick={goToProfile} />
                <MenuItem text="Wyloguj się" onClick={logout} />
              </MenuItems>
            }
            distance={12}
            {...tooltipConfig}
          >
            <UserImage src={auth?.image} />
          </StyledTooltip>
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
  sizeName: string.isRequired,
};

User.defaultProps = {
  auth: null,
};

export default User;
