import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import Modules from './Modules';
import ModulesNav from './ModulesNav';
import ModulesModals from './ModulesModals';
import { MainContainer, LeftColumn, RightColumn, NavColumn } from './styles';

@connect(({ auth }) => ({ user: auth }))
class UserProfile extends PureComponent {
  state = {
    openedModalNames: [],
  };

  openModal = name =>
    this.setState(state => ({ openedModalNames: [...state.openedModalNames, name] }));

  closeModal = name =>
    this.setState(state => ({ openedModalNames: state.openedModalNames.filter(n => n !== name) }));

  render() {
    const { user } = this.props;
    const { openedModalNames } = this.state;
    const { openModal, closeModal } = this;

    return (
      <Fragment>
        <MainContainer>
          <LeftColumn>{user && <Card {...user} />}</LeftColumn>
          <RightColumn>
            <Modules modules={user?.modules} openModal={openModal} />
          </RightColumn>
        </MainContainer>
        <ModulesModals
          openedModalNames={openedModalNames}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Fragment>
    );
  }
}

UserProfile.propTypes = {
  user: object,
};

UserProfile.defaultProps = {
  user: null,
};

export default UserProfile;
