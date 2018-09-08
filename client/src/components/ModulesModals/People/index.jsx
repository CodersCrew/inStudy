import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { FieldArray } from 'redux-form';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import ItemModal from './ItemModal';
import {
  Container,
  AddItemButton,
  ItemContainer,
  BasicData,
  Title,
  Subtitle,
  Description,
  Buttons,
  Button,
  Image,
} from './styles';


class ItemsList extends PureComponent {
  state = {
    isModalOpen: false,
    modalData: {},
  };

  closeModal = () => this.setState({ isModalOpen: false });

  submitModalData = (item, index = null) => {
    if (index === null) {
      this.props.fields.push(item);
    } else {
      this.props.fields.remove(index);
      this.props.fields.insert(index, item);
    }
  };

  addItem = () => this.setState({ isModalOpen: true });

  editItem = index =>
    this.setState({
      isModalOpen: true,
      modalData: { ...this.props.fields.getAll()[index], index },
    });

  removeItem = index => this.props.fields.remove(index);

  renderItem = ({ image, firstName, lastName, title, description }, index) => {
    return (
      <ItemContainer key={`${firstName}-${lastName}`}>
        <Image src={(typeof image === 'string') ? image : image?.preview} />
        <BasicData>
          <Title>{`${firstName} ${lastName}`}</Title>
          <Subtitle>{title}</Subtitle>
        </BasicData>
        <Description>{description}</Description>
        <Buttons>
          <Button type="delete" onClick={() => this.removeItem(index)}>
            <i className="fal fa-trash-alt" />
          </Button>
          <Button type="edit" onClick={() => this.editItem(index)}>
            <i className="fal fa-edit" />
          </Button>
        </Buttons>
      </ItemContainer>
    );
  };

  render() {
    const fields = this.props.fields.getAll() || [];

    return (
      <Container>
        {fields.map(this.renderItem)}
        <AddItemButton onClick={this.addItem}>+ Dodaj osobę</AddItemButton>
        {this.state.isModalOpen && (
          <ItemModal
            itemData={this.state.modalData}
            visible={this.state.isModalOpen}
            onClose={this.closeModal}
            onSubmit={this.submitModalData}
          />
        )}
      </Container>
    );
  }
}

ItemsList.propTypes = {
  fields: object.isRequired,
};

const People = props => (
  <ModalBase {...getModalBaseData(props)} contentHeader="Osoby">
    <FieldArray name="items" component={ItemsList} />
  </ModalBase>
);

export default People;
