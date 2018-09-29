import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { ImagePicker, Input } from 'components/reduxFormFields';
import { required, url } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Container, EditCard, Actions, Action, AddTrait, StaticCard, Image, Data, Name, Description } from './styles';

@connect(state => ({
  errors: getFormSyncErrors('moduleModal')(state),
}))
class Logos extends PureComponent {
  state = {
    editingCardIndex: null,
    cardValuesSnapshot: {},
  };

  isEditing = index => this.state.editingCardIndex === index;

  addTrait = (index, push) => {
    push({ image: '', title: '', url: '' });
    this.startTraitEditing(index, { image: '', title: '', url: '' });
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
      <Field name={`${rfName}.image`} component={ImagePicker} props={{ placeholder: 'Logo', width: 200 }} validate={[required]} />
      <Field name={`${rfName}.title`} component={Input} props={{ placeholder: 'Tytuł' }} validate={[required]} />
      <Field name={`${rfName}.url`} component={Input} props={{ placeholder: 'Adres URL' }} validate={[url]} />
      <Actions>
        <Action isDisabled={isDisabled} onClick={this.saveCardEditing}>Zapisz</Action>
        <Action onClick={() => this.cancelCardEditing(insert, remove)}>Anuluj</Action>
      </Actions>
    </EditCard>
  );

  renderLogostaticView = (index, isDisabled, remove, traitValue) => (
    <StaticCard>
      <Image src={(typeof traitValue.image === 'string') ? traitValue.image : traitValue.image?.preview} />
      <Data>
        <Name>{traitValue.title}</Name>
        <Description>{traitValue.url}</Description>
      </Data>
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
      : this.renderLogostaticView(index, isDisabled, remove, traitValue);
  }

  renderLogos = ({ fields }) => {
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
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Lista logotypów">
        <FieldArray name="items" component={this.renderLogos} props={{ editingCardIndex }} />
      </ModalBase>
    );
  }
}

export default Logos;
