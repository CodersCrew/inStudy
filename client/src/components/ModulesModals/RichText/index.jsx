import React from 'react';
import { Field } from 'redux-form';
import { RichText } from 'components/reduxFormFields';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';

const RichTextModal = props => (
  <ModalBase {...getModalBaseData(props)} contentHeader="Tekst wewnątrz modułu">
    <Field component={RichText} name="description" />
  </ModalBase>
);

export default RichTextModal;
