import React, { PureComponent, Fragment } from 'react';
import { object, bool, array } from 'prop-types';
import Card from './Card';
import { Modules } from 'components';
import ModulesModals from 'components/ModulesModals';
import { MainContainer, LeftColumn, RightColumn } from './styles';

class UserProfile extends PureComponent {
  state = {
    openedModalNames: [],
  };

  openModal = name => this.setState(state => ({ openedModalNames: [...state.openedModalNames, name] }));

  closeModal = name => this.setState(state => ({ openedModalNames: state.openedModalNames.filter(n => n !== name) }));

  render() {
    const { data, editable, accessibleModals } = this.props;
    const { openedModalNames } = this.state;
    const { openModal, closeModal } = this;

    return (
      data && (
        <Fragment>
          <MainContainer>
            <LeftColumn>{data && <Card {...data} editable={editable} />}</LeftColumn>
            <RightColumn>
              <Modules modules={data?.modules} openModal={openModal} editable={editable} />
            </RightColumn>
          </MainContainer>
          {editable && (
            <ModulesModals
              openedModalNames={openedModalNames}
              openModal={openModal}
              closeModal={closeModal}
              accessibleModals={accessibleModals}
            />
          )}
        </Fragment>
      )
    );
  }
}

UserProfile.propTypes = {
  editable: bool,
  data: object,
  accessibleModals: array,
};

UserProfile.defaultProps = {
  editable: false,
  data: null,
  accessibleModals: [],
};

export default UserProfile;
