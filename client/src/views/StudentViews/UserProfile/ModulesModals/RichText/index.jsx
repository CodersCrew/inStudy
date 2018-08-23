import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Field } from 'redux-form';
import { Input } from 'components/reduxFormFields';
import ModalBase from '../ModalBase';

class RichText extends PureComponent {
  render() {
    const { visible, onClose, name, icon } = this.props;
    return (
      <ModalBase visible={visible} onClose={onClose} name={name} icon={icon}>
        <Field component={Input} name="description" props={{ label: 'Treść', fullWidth: true }} />
      </ModalBase>
    );
  }
}

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Rich Text',
};

export default RichText;
