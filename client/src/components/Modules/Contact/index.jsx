/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, isEmail } from 'utils/validators';
import { Input, TextArea } from 'components/reduxFormFields';
import { connect } from 'react-redux';
import { sendContactMail as sendInitiativeContactMail } from 'store/actions/initiativeModules';
import { sendContactMail as sendUserContactMail } from 'store/actions/userModules';
import { Container, StyledButton } from './styles';

@reduxForm({ form: 'contactForm' })
@connect(
  ({ publicProfile, auth }) => ({ publicProfile, auth }),
  { sendInitiativeContactMail, sendUserContactMail },
)
class Contact extends PureComponent {
  onSubmit = (values) => {
    if (!this.props.publicProfile) {
      const { _id } = this.props.auth;
      this.props.sendUserContactMail(_id, { ...values });
    } else {
      const { _id } = this.props.publicProfile;
      this.props.sendInitiativeContactMail(_id, { ...values });
    }
  };

  render() {
    return (
      <Container>
        <Field name="email" component={Input} props={{ label: 'E-mail' }} validate={[required, isEmail]} />
        <Field name="title" component={Input} props={{ label: 'Tytuł wiadomości' }} validate={[required]} />
        <Field name="content" component={TextArea} props={{ label: 'Treść wiadomości' }} validate={[required]} />
        <StyledButton type="primary" onClick={this.props.handleSubmit(this.onSubmit)}>Wyślij</StyledButton>
      </Container>
    );
  }
}

export default Contact;
