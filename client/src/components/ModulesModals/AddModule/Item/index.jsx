import React from 'react';
import { string, exact, node, func } from 'prop-types';
import { Container, Circle, Content, Name, Description } from './styles';

const Item = ({ data, openModal, onClose }) => (
  <Container
    onClick={() => {
      openModal(data.key);
      onClose();
    }}
  >
    <Circle>
      <i className={data.iconClass} />
    </Circle>
    <Content>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
    </Content>
  </Container>
);

Item.propTypes = {
  data: exact({
    key: string.isRequired,
    name: string.isRequired,
    icon: string.isRequired,
    description: string.isRequired,
    module: node.isRequired,
    modalContent: node.isRequired,
  }),
  openModal: func.isRequired,
  onClose: func.isRequired,
};

export default Item;
