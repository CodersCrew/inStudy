import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'components';
import { Input, TextArea, ImagePicker } from 'components/reduxFormFields';
import { required, maxLength } from 'utils/validators';
import { Container } from './styles';

const maxDescriptionLength = maxLength(260);

@reduxForm({ form: 'cardEditModal' })
class CardEditModal extends PureComponent {
  onSubmit = values => {
    console.log(values);
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
          </Container>
        </Modal>
      )
    );
  }
}

CardEditModal.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  onClose: func.isRequired,
};

CardEditModal.defaultProps = {
  visible: false,
};

export default CardEditModal;
