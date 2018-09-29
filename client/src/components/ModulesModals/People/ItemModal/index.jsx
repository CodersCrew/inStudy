import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Modal } from 'components';
import { Input, TextArea, ImagePicker, SingleSelect } from 'components/reduxFormFields';
import { required, url } from 'utils/validators';
import { omit } from 'utils';
import socials from 'data/socials';
import { Container, Socials, Label, TrashIcon } from './styles';

const socialsOptions = Object.keys(socials).map(key => ({ label: socials[key].name, value: key }));

const areAllFieldsFilled = fields =>
  fields.reduce((acc, curr) => acc && curr && (curr.socialType || curr.url || curr.image), true);

@reduxForm({ form: 'personItemForm' })
class ItemModal extends PureComponent {
  constructor(props) {
    super(props);

    if (Object.keys(props.itemData).length) {
      this.props.initialize(omit(props.itemData, ['index']));
    }
  }

  onSubmit = (values) => {
    this.props.onSubmit(values, this.props.itemData.index);
    this.props.onClose();
  };

  renderSocialTypeSelect = social => (
    <Field
      name={`${social}.socialType`}
      component={SingleSelect}
      props={{
        noWrapper: true,
        options: socialsOptions,
        placeholder: 'Nazwa portalu',
        style: { width: 160 },
      }}
    />
  );

  renderSocialInput = (social, index, remove) => (
    <Field
      key={social}
      name={`${social}.url`}
      component={Input}
      props={{
        addonBefore: this.renderSocialTypeSelect(social),
        addonAfter: remove && <TrashIcon onClick={() => remove(index)} />,
        placeholder: 'Pełen adres URL',
      }}
      validate={remove ? [url] : []}
    />
  );

  renderSocials = ({ fields = [] }) => {
    const fieldsValues = fields.getAll();
    const lastSocialIndex = fields.length - 1;

    if (fields.length === 0 || areAllFieldsFilled(fieldsValues)) {
      fields.push({});
    }

    return (
      <Socials>
        <Label>Social media</Label>
        {fields.map((social, index) =>
          this.renderSocialInput(social, index, index !== lastSocialIndex && fields.remove))}
      </Socials>
    );
  };

  render() {
    return (
      <Modal
        type="complex"
        onCancel={this.props.onClose}
        visible={this.props.visible}
        title="Dodaj osobę"
        icon="fal fa-user-plus"
        width={644}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: 'Dodaj',
            type: 'primary',
            loading: this.props.submitting,
          },
          {
            onClick: () => this.props.onClose(),
            label: 'Anuluj',
            disabled: this.props.submitting,
          },
        ]}
      >
        <Container>
          <Field
            name="image"
            component={ImagePicker}
            props={{ label: 'Zdjęcie', aspect: 1, width: 300 }}
            validate={[required]}
          />
          <Field
            name="firstName"
            component={Input}
            props={{ label: 'Imię' }}
            validate={[required]}
          />
          <Field
            name="lastName"
            component={Input}
            props={{ label: 'Nazwisko' }}
            validate={[required]}
          />
          <Field
            name="title"
            component={Input}
            props={{ label: 'Tytuł', placeholder: 'np. stanowisko, rola' }}
          />
          <Field
            name="description"
            component={TextArea}
            props={{ label: 'Opis' }}
          />
          <FieldArray name="socials" component={this.renderSocials} />
        </Container>
      </Modal>
    );
  }
}

ItemModal.propTypes = {
  initialize: func,
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  onSubmit: func.isRequired,
  itemData: object,
};

ItemModal.defaultProps = {
  initialize: () => {},
  visible: false,
  itemData: {},
};

export default ItemModal;
