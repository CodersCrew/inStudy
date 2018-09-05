import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Field } from 'redux-form';
import { RichText } from 'components/reduxFormFields';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';

class RichTextModal extends PureComponent {
  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Tekst wewnątrz modułu">
        <Field component={RichText} name="description" />
      </ModalBase>
    );
  }
}

RichTextModal.propTypes = {
  text: string,
};

RichTextModal.defaultProps = {
  text: 'Rich Text',
};

export default RichTextModal;
