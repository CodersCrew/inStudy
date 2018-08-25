import React from 'react';
import { bool, string, func, oneOfType, object, shape, number } from 'prop-types';
import { Input } from 'antd';
import FieldWrapper from './FieldWrapper';

const { TextArea } = Input;

const TextAreaField = props => (
  <FieldWrapper {...props} className={`${props.className} text-area-field-wrapper`}>
    <TextArea
      disabled={props.disabled}
      name={props.input.name}
      placeholder={props.placeholder}
      value={props.input.value}
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onPressEnter={props.onPressEnter}
    />
  </FieldWrapper>
);

TextAreaField.propTypes = {
  autosize: oneOfType([bool, shape({ minRows: number, maxRows: number })]),
  className: string,
  disabled: bool,
  input: object.isRequired,
  placeholder: string,
  onPressEnter: func,
};

TextAreaField.defaultProps = {
  autosize: { minRows: 3, maxRows: 10 },
  className: '',
  disabled: false,
  placeholder: '',
  onPressEnter: () => {},
};

export default TextAreaField;
