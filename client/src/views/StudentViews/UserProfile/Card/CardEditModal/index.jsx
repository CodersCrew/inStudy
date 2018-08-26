import React, { PureComponent, Fragment } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { updateBasicUserData } from 'store/actions';
import { Modal } from 'components';
import { Input, TextArea, ImagePicker, SingleSelect } from 'components/reduxFormFields';
import { required, maxLength, url } from 'utils/validators';
import { socials } from 'data';
import { Container, Label, TrashIcon } from './styles';

const maxDescriptionLength = maxLength(260);

const socialsOptions = Object.keys(socials).map(key => ({ label: socials[key].name, value: key }));

const areAllFieldsFilled = fields =>
  fields.reduce((acc, { type, url }) => acc && (type || url), true);

@reduxForm({ form: 'cardEditModal' })
@connect(
  null,
  { updateBasicUserData },
)
class CardEditModal extends PureComponent {
  constructor(props) {
    super(props);

    props.initialize(props.userData);
  }

  onSubmit = values => {
    const parsedSocials = values.socials.filter(({ type, url }) => type && url);
    console.log({ ...values, socials: parsedSocials });
    this.props.updateBasicUserData({ ...values, socials: parsedSocials });
    this.props.onClose();
  };

  renderSocialTypeSelect = social => (
    <Field
      name={`${social}.type`}
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
      <Fragment>
        <Label>Social media</Label>
        {fields.map((social, index) =>
          this.renderSocialInput(social, index, index !== lastSocialIndex && fields.remove),
        )}
      </Fragment>
    );
  };

  render() {
    return (
      this.props.visible && (
        <Modal
          visible={this.props.visible}
          onClose={this.props.onClose}
          title="Edytuj swoje podstawowe dane"
          icon="/fa-icons/user-light.svg"
          type="complex"
          width={644}
          buttons={[
            {
              onClick: this.props.handleSubmit(this.onSubmit),
              label: 'Aktualizuj dane',
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
              props={{ label: 'Zdjęcie profilowe' }}
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
              name="email"
              component={Input}
              props={{ label: 'E-mail kontaktowy' }}
              validate={[required]}
            />
            <Field
              name="description"
              component={TextArea}
              props={{ label: 'Krótki opis' }}
              validate={[maxDescriptionLength]}
            />
            <FieldArray name="socials" component={this.renderSocials} />
          </Container>
        </Modal>
      )
    );
  }
}

CardEditModal.propTypes = {
  handleSubmit: func.isRequired,
  initialize: func.isRequired,
  submitting: bool.isRequired,
  updateBasicUserData: func.isRequired,
  userData: object.isRequired,
  visible: bool,
  onClose: func.isRequired,
};

CardEditModal.defaultProps = {
  visible: false,
};

export default CardEditModal;
