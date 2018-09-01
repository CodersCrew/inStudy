import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import CreateInitiative from './CreateInitiative';
import { MainContainer, Wrapper, Icon, Header, StyledButton } from './styles';

class UserInitiatives extends PureComponent {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  goToInitiatives = () => this.props.history.push('/inicjatywy');

  render() {
    return (
      <MainContainer>
        <Wrapper>
          <Icon className="fal fa-grin-beam-sweat" />
          <Header>
            Obecnie nie działasz w żadnej inicjatywie. Oznacza to, że w ramach tej zkaładki masz 2 możliwości.
          </Header>
          <StyledButton size="large" onClick={this.goToInitiatives}>
            Wyszukaj istniejącą inicjatywę
          </StyledButton>
          <StyledButton size="large" onClick={this.openModal}>
            Utwórz nową inicjatywę
          </StyledButton>
        </Wrapper>
        <CreateInitiative closeModal={this.closeModal} visible={this.state.isModalOpen} />
      </MainContainer>
    );
  }
}

UserInitiatives.propTypes = {
  history: object.isRequired,
};

export default UserInitiatives;
