import React, { PureComponent } from 'react';
import { object, string, func, bool, number } from 'prop-types';
import { FieldArray } from 'redux-form';
import moment from 'moment';
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

const sortByDates = (itemA, itemB) => {
  const [dateA, dateB] = [moment(itemA.from, 'MM-YYYY'), moment(itemB.from, 'MM-YYYY')];

  if (dateA.isBefore(dateB)) return 1;
  else if (dateA.isAfter(dateB)) return -1;
  return 0;
};

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
    const fields = this.props.fields.getAll() || [];

    return (
      <Container>
        {fields.sort(sortByDates).map(this.renderItem)}
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

ItemsList.propTypes = {
  fields: object.isRequired,
};

class TimeLine extends PureComponent {
  render() {
    const { visible, onClose, name, icon, type, initialValues, moduleIndex } = this.props;
    return (
      <ModalBase
        visible={visible}
        onClose={onClose}
        name={name}
        icon={icon}
        type={type}
        contentHeader="Elementy na osi czasu"
        initialValues={initialValues}
        moduleIndex={moduleIndex}
      >
        <FieldArray name="items" component={ItemsList} />
      </ModalBase>
    );
  }
}

TimeLine.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
  name: string.isRequired,
  icon: string.isRequired,
  type: string.isRequired,
  initialValues: object,
  moduleIndex: number,
};

TimeLine.defaultProps = {
  initialValues: null,
  moduleIndex: null,
};

export default TimeLine;
