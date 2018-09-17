import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { IconPicker, Input, TextArea } from 'components/reduxFormFields';
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
    push({ icon: '', name: '', description: '' });
    this.startTraitEditing(index, { icon: '', name: '', description: '' });
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
      <Field name={`${rfName}.icon`} component={IconPicker} props={{ placeholder: 'Ikona' }} validate={[required]} />
      <Field name={`${rfName}.name`} component={Input} props={{ placeholder: 'Tytuł/Nazwa' }} validate={[required]} />
      <Field
        name={`${rfName}.description`}
        component={TextArea}
        props={{ placeholder: 'Opis', rows: 4 }}
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
      <IconWrapper>
        <Icon className={`fal fa-${traitValue.icon}`} />
      </IconWrapper>
      <Name>{traitValue.name}</Name>
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
    this.error = Array.isArray(errors?.items) && errors.items.find(trait => trait && Object.keys(trait).length);

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
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Lista cech">
        <FieldArray name="items" component={this.renderTraits} props={{ editingCardIndex }} />
      </ModalBase>
    );
  }
}

export default Traits;
