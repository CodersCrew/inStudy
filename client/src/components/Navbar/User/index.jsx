import React, { Fragment } from 'react';
import { oneOfType, bool, object, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import tooltipConfig from '../tooltipConfig';
import { logout } from '../../../store/actions';
import { MenuItems, MenuItem } from '../Menu';
import { StyledButton, UserImage, StyledTooltip } from './styles';

const goToRegistrationPage = ({ push }) => push('/rejestracja');

const goToProfile = ({ push }) => push('/student/profil');

const User = ({ sizeName, logout, auth, history }) => (
  <Fragment>
    {!auth ? (
      <StyledButton ghost size="small" kind="white" onClick={() => goToRegistrationPage(history)}>
        {sizeName === 'xs' ? <span className="fas fa-user" /> : <span>Moje konto</span>}
      </StyledButton>
    ) : (
      <StyledTooltip
        html={
          <MenuItems>
            <MenuItem text="Mój profil" onClick={() => goToProfile(history)} />
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

User.propTypes = {
  auth: oneOfType([bool, object]),
  history: object.isRequired,
  logout: func.isRequired,
  sizeName: string.isRequired,
};

User.defaultProps = {
  auth: null,
};

export default withRouter(
  connect(
    ({ auth, ui }) => ({ auth, sizeName: ui.size.name }),
    { logout },
  )(User),
);
