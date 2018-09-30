import React from 'react';
import { string, oneOfType, object, array, func } from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import ProjectModal from './ProjectModal';
import { Container, ProjectContainer, Card, Text, Name, Header, StyledButton } from './styles';

const Project = props => (
  <ProjectContainer>
    <div>
      <Card src={props.image} />
      <Text>
        <Name>{props.name}</Name>
        <Header>{props.header}</Header>
      </Text>
      <StyledButton type="primary" onClick={() => props.openModal(props)}>Więcej</StyledButton>
    </div>
  </ProjectContainer>
);

Project.propTypes = {
  name: string.isRequired,
  header: string,
  image: oneOfType([object, string]).isRequired,
  openModal: func.isRequired,
};

const withHocs = compose(
  withState('modalData', 'setModal', {}),
  withHandlers({
    openModal: ({ setModal }) => data => setModal(() => data),
    closeModal: ({ setModal }) => () => setModal(() => ({})),
  }),
);

const Projects = ({ items, modalData, openModal, closeModal }) => (
  <Container>
    {items.map(item => <Project key={item.name} {...item} openModal={openModal} />)}
    <ProjectModal
      key="modal"
      visible={!!Object.keys(modalData).length}
      onCancel={closeModal}
      {...modalData}
    />
  </Container>
);

Projects.propTypes = {
  items: array.isRequired,
};

export default withHocs(Projects);
