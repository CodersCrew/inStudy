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
            Obecnie nie działasz w żadnej inicjatywie. Oznacza to, że w ramach tej zkaładki masz 2
            możliwości.
          </Header>
          <StyledButton ghost kind="grey" onClick={this.goToInitiatives}>
            Wyszukaj istniejącą inicjatywę
          </StyledButton>
          <StyledButton ghost kind="grey" onClick={this.openModal}>
            Utwórz nową inicjatywę
          </StyledButton>
        </Wrapper>
        {this.state.isModalOpen && <CreateInitiative closeModal={this.closeModal} />}
      </MainContainer>
    );
  }
}

UserInitiatives.propTypes = {
  history: object.isRequired,
};

export default UserInitiatives;
