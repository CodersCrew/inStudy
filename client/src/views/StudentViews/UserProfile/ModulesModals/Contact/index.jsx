import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { Input } from 'components/reduxFormFields';
import ModalBase from '../ModalBase';
import { required, mail } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';

class Contatct extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)}>
        <Field name="user-email" component={Input} props={{ label: 'E-mail' }} validate={[required, mail]} />
      </ModalBase>
    );
  }
}

export default Contatct;
