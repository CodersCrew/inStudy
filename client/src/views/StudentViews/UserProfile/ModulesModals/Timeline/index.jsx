import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { FieldArray } from 'redux-form';
import ModalBase from '../ModalBase';
import ItemModal from './ItemModal';
import {
  Container,
  AddItemButton,
  ItemContainer,
  Dates,
  Title,
  Subtitle,
  Description,
  Buttons,
  Button,
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

  renderItem = ({ from, to, title, subtitle, description }, index) => {
    return (
      <ItemContainer key={title}>
        <Dates>{`${from} - ${to}`}</Dates>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
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
    const {
      fields,
      meta: { error, submitFailed },
    } = this.props;

    return (
      <Container>
        {fields.getAll()?.map(this.renderItem)}
        <AddItemButton onClick={this.addItem}>+ Dodaj element do osi czasu</AddItemButton>
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

class TimeLine extends PureComponent {
  render() {
    const { visible, onClose, name, icon, type } = this.props;
    return (
      <ModalBase
        visible={visible}
        onClose={onClose}
        name={name}
        icon={icon}
        type={type}
        contentHeader="Elementy na osi czasu"
      >
        <FieldArray name="items" component={ItemsList} />
      </ModalBase>
    );
  }
}

TimeLine.propTypes = {
  text: string,
};

TimeLine.defaultProps = {
  text: 'Rich Text',
};

export default TimeLine;
