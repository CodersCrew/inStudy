import React, { Fragment } from 'react';
import { oneOfType, bool, object, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { logout } from 'store/actions';
import { MenuItem } from '../Menu';
import { StyledButton, UserImage } from './styles';

const goToRegistrationPage = ({ push }) => push('/rejestracja');

const goToProfile = ({ push }) => push('/student/profil');

const User = ({ sizeName, logout, auth, history }) => (
  <Fragment>
    {!auth ? (
      <StyledButton
        data-cy="my-account-button"
        ghost
        size="small"
        kind="white"
        onClick={() => goToRegistrationPage(history)}
      >
        {sizeName === 'xs' ? <span className="fas fa-user" /> : <span>Moje konto</span>}
      </StyledButton>
    ) : (
      <Dropdown
        overlay={(
          <Menu>
            <Menu.Item>
              <MenuItem text="Mój profil" onClick={() => goToProfile(history)} />
            </Menu.Item>
            <Menu.Item>
              <MenuItem text="Wyloguj się" onClick={logout} />
            </Menu.Item>
          </Menu>
        )}
        trigger={['click']}
        placement="bottomRight"
      >
        <UserImage src={auth?.image} icon="user" size={24} />
      </Dropdown>
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
