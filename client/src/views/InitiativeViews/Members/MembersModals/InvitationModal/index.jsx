import React, { PureComponent } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { bool, func } from 'prop-types';
import { Icon } from 'antd';
import { withCloseAnimation } from 'hocs';
import { required, isEmail } from 'utils/validators';
import { Input } from 'components/reduxFormFields';
import { Modal } from 'components';
import { EmailsList } from './styles';

@withCloseAnimation
@reduxForm({ form: 'invitationModal' })
class InvitationModal extends PureComponent {
  onSubmit = (values) => {
    const emails = values.emails.map(({ email }) => email).filter(email => email);
    console.log(emails);
    this.props.onCancel();
  }

  renderEmailsList = ({ fields }) => {
    const allFields = fields.getAll() || [];
    const fieldsLength = fields.length;
    if (!fieldsLength || allFields.filter(({ email }) => email).length === fieldsLength) {
      fields.push({});
    }

    return fields.map((rfName, index) => {
      const isLastRow = index === fieldsLength - 1;
      const validate = isLastRow ? [] : [required, isEmail];

      return (
        <EmailsList>
          <Field
            name={`${rfName}.email`}
            component={Input}
            validate={validate}
            props={{
              placeholder: 'E-mail',
              addonAfter: <Icon type="delete" onClick={() => fields.remove(index)} />,
            }}
          />
        </EmailsList>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <Modal
        title="Zaproś nowe osoby do inicjatywy"
        type="complex"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        width={320}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: 'Wyślij zaproszenia',
            type: 'primary',
          },
          {
            onClick: this.props.onCancel,
            label: 'Anuluj wysyłanie',
          },
        ]}
      >
        <FieldArray name="emails" component={this.renderEmailsList} rerenderOnEveryChange />
      </Modal>
    );
  }
}

InvitationModal.propTypes = {
  handleSubmit: func,
  visible: bool,
  onCancel: func,
};

InvitationModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default InvitationModal;
