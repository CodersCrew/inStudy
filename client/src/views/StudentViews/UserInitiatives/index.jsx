import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from 'hocs';
import { Fab } from 'components';
import CreateInitiative from './CreateInitiative';
import InitiativeCard from './InitiativeCard';
import { MainContainer, Wrapper, Icon, Header, StyledButton } from './styles';

@withAuth('userProfile')
@connect(state => ({ initiatives: state?.auth?.initiatives }))
class UserInitiatives extends PureComponent {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  goToInitiatives = () => this.props.history.push('/inicjatywy');

  renderEmptyView = () => (
    <Wrapper>
      <Icon className="fal fa-grin-beam-sweat" />
      <Header>
        Obecnie nie działasz w żadnej inicjatywie. Oznacza to, że w ramach tej zkładki masz 2 możliwości.
      </Header>
      <StyledButton size="large" onClick={this.goToInitiatives}>
        Wyszukaj istniejącą inicjatywę
      </StyledButton>
      <StyledButton size="large" onClick={this.openModal}>
        Utwórz nową inicjatywę
      </StyledButton>
    </Wrapper>
  );

  renderInitiatives = () => (
    <Fragment>
      {this.props.initiatives.map(initiative => (
        <InitiativeCard key={initiative._id} {...initiative} />
      ))}
      <Fab iconClass="fal fa-plus" title="Dodaj nową inicjatywę" onClick={this.openModal} />
    </Fragment>
  );

  render() {
    return (
      <MainContainer>
        {this.props.initiatives?.length ? this.renderInitiatives() : this.renderEmptyView()}
        <CreateInitiative closeModal={this.closeModal} visible={this.state.isModalOpen} />
      </MainContainer>
    );
  }
}

UserInitiatives.propTypes = {
  history: object.isRequired,
};

export default UserInitiatives;
