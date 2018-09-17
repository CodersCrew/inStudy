import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Container } from './styles';
import { required, mail } from 'utils/validators';
import { EmailInput, TitleInput, ContentTextArea, ButtonSubmit } from './styles';

@reduxForm({ form: 'contactForm' })
class Contact extends PureComponent {
  onSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <Container>
        <Field name="email" component={EmailInput} props={{ label: 'E-mail' }} validate={[required, mail]} />
        <Field name="title" component={TitleInput} props={{ label: 'Tytuł wiadomości' }} validate={[required]} />
        <Field name="content" component={ContentTextArea} props={{ label: 'Treść wiadomości' }} validate={[required]} />
        <ButtonSubmit type="primary" onClick={this.props.handleSubmit(this.onSubmit)}>Wyślij</ButtonSubmit>
      </Container>
    );
  }
}

Contact.propTypes = {
  text: string,
};

Contact.defaultProps = {
  text: 'Moduł kontakt',
};

export default Contact;
