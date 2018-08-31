import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'antd';
import { Input, TextArea } from 'components/reduxFormFields';
import { Container } from './styles';

@reduxForm({ form: 'contactForm' })
class Contact extends PureComponent {
  onSubmit = values => {
    console.log(values);
  };

  render() {
    console.log(this.props);
    return (
      <Container>
        <Field name="email" component={Input} props={{ label: 'E-mail' }} />
        <Field name="title" component={Input} props={{ label: 'Tytuł wiadomości' }} />
        <Field name="content" component={TextArea} props={{ label: 'Treść wiadomości' }} />
        <Button onClick={this.props.handleSubmit(this.onSubmit)}>Wyślij</Button>
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
