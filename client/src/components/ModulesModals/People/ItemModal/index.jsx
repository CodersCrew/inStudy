import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'components';
import { Input, TextArea, ImagePicker } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { omit } from 'utils';
import { Container } from './styles';

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
            props={{ label: 'Zdjęcie' }}
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
            validate={[required]}
          />
        </Container>
      </Modal>
    );
  }
}

ItemModal.propTypes = {
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  onSubmit: func.isRequired,
  itemData: object,
};

ItemModal.defaultProps = {
  visible: false,
  itemData: {},
};

export default ItemModal;
