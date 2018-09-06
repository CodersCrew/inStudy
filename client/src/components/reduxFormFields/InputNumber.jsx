import React from 'react';
import { bool, func, oneOf, object, number } from 'prop-types';
import { InputNumber } from 'antd';
import FieldWrapper from './FieldWrapper';

const InputNumberField = props => (
  <FieldWrapper {...props}>
    <InputNumber
      autoFocus={props.autoFocus}
      disabled={props.disabled}
      formatter={props.formatter}
      max={props.max}
      min={props.min}
      name={props.input.name}
      parser={props.parser}
      precision={props.precision}
      size={props.size}
      step={props.step}
      value={props.input.value}
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
    />
  </FieldWrapper>
);

InputNumberField.propTypes = {
  autoFocus: bool,
  defaultValue: number,
  disabled: bool,
  formatter: func,
  input: object.isRequired,
  min: number,
  max: number,
  parser: func,
  precision: number,
  size: oneOf(['small', 'default', 'large']),
  step: number,
};

InputNumberField.defaultProps = {
  autoFocus: false,
  defaultValue: 0,
  disabled: false,
  formatter: undefined,
  min: undefined,
  max: undefined,
  parser: undefined,
  precision: 2,
  size: 'default',
  step: 1,
};

export default InputNumberField;
