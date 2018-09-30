import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { Input, TextArea } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Container, EditCard, Actions, Action, AddTrait, StaticCard, IconWrapper, Icon, Name, Description } from './styles';

@connect(state => ({
  errors: getFormSyncErrors('moduleModal')(state),
}))
class Traits extends PureComponent {
  state = {
    editingCardIndex: null,
    cardValuesSnapshot: {},
  };

  isEditing = index => this.state.editingCardIndex === index;

  addTrait = (index, push) => {
    push({ title: '', description: '' });
    this.startTraitEditing(index, { title: '', description: '' });
  };

  startTraitEditing = (editingCardIndex, cardValuesSnapshot) => this.setState({ editingCardIndex, cardValuesSnapshot });

  cancelCardEditing = (insert, remove) => {
    const { cardValuesSnapshot } = this.state;

    remove();
    if (cardValuesSnapshot.name) {
      insert(cardValuesSnapshot);
    }

    this.setState({ editingCardIndex: null, cardValuesSnapshot: {} });
  };

  saveCardEditing = () => this.setState({ editingCardIndex: null, cardValuesSnapshot: {} });

  renderTraitEditView = (rfName, isDisabled, remove, insert) => (
    <EditCard>
      <Field name={`${rfName}.title`} component={Input} props={{ placeholder: 'Tytuł' }} validate={[required]} />
      <Field
        name={`${rfName}.description`}
        component={TextArea}
        props={{ placeholder: 'Szczegóły', rows: 4 }}
        validate={[required]}
      />
      <Actions>
        <Action isDisabled={isDisabled} onClick={this.saveCardEditing}>Zapisz</Action>
        <Action onClick={() => this.cancelCardEditing(insert, remove)}>Anuluj</Action>
      </Actions>
    </EditCard>
  );

  renderTraitStaticView = (index, isDisabled, remove, traitValue) => (
    <StaticCard>
      <Name>{traitValue.title}</Name>
      <Description>{traitValue.description}</Description>
      <Actions>
        <Action isDisabled={isDisabled} onClick={() => this.startTraitEditing(index, traitValue)}>Edytuj</Action>
        <Action isDisabled={isDisabled} onClick={remove}>Usuń</Action>
      </Actions>
    </StaticCard>
  );

  renderTrait = (rfName, index, fields) => {
    const isDisabled = (!this.isEditing(index) && this.state.editingCardIndex !== null) || this.error;
    const remove = () => fields.remove(index);
    const insert = value => fields.insert(index, value);
    const traitValue = fields.get(index);

    return (this.state.editingCardIndex === index)
      ? this.renderTraitEditView(rfName, isDisabled, remove, insert)
      : this.renderTraitStaticView(index, isDisabled, remove, traitValue);
  }

  renderTraits = ({ fields }) => {
    const { props: { errors }, state: { editingCardIndex } } = this;
    this.error = Array.isArray(errors?.items) && errors.items.find(item => item && Object.keys(item).length);

    return (
      <Container>
        {fields.map(this.renderTrait)}
        {(!this.error && editingCardIndex === null) && (
          <AddTrait onClick={() => this.addTrait(fields.length, fields.push)} />
        )}
      </Container>
    );
  }

  render() {
    const { editingCardIndex } = this.state;

    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Elementy listy">
        <FieldArray name="items" component={this.renderTraits} props={{ editingCardIndex }} />
      </ModalBase>
    );
  }
}

export default Traits;
