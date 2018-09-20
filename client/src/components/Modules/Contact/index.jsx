/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, isEmail } from 'utils/validators';
import { Input, TextArea } from 'components/reduxFormFields';
import { Container, StyledButton } from './styles';

@reduxForm({ form: 'contactForm' })
class Contact extends PureComponent {
  onSubmit = (values) => {
    console.log(values);
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
