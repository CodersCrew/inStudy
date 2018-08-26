import React from 'react';
import { bool, string, node, func, oneOf, oneOfType, object } from 'prop-types';
import { Input } from 'antd';
import FieldWrapper from './FieldWrapper';

const InputField = props => (
  <FieldWrapper {...props}>
    <Input
      addonAfter={props.addonAfter}
      addonBefore={props.addonBefore}
      disabled={props.disabled}
      name={props.input.name}
      placeholder={props.placeholder}
      prefix={props.prefix}
      size={props.size}
      suffix={props.suffix}
      type={props.type}
      value={props.input.value}
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onPressEnter={props.onPressEnter}
    />
  </FieldWrapper>
);

InputField.propTypes = {
  addonAfter: oneOfType([string, node]),
  addonBefore: oneOfType([string, node]),
  disabled: bool,
  input: object.isRequired,
  placeholder: string,
  prefix: oneOfType([string, node]),
  size: oneOf(['small', 'default', 'large']),
  suffix: oneOfType([string, node]),
  type: oneOf(['text', 'password']),
  onPressEnter: func,
};

InputField.defaultProps = {
  addonAfter: '',
  addonBefore: '',
  disabled: false,
  placeholder: '',
  prefix: '',
  size: 'default',
  suffix: '',
  type: 'text',
  onPressEnter: () => {},
};

export default InputField;
