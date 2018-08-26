import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';
import FieldWrapper from './FieldWrapper';

export default class InputField extends PureComponent {
  render() {
    const { autoFocus, disabled, input, className, style, min, max, step } = this.props;

    return (
      <FieldWrapper {...this.props}>
        <InputNumber
          autoFocus={autoFocus}
          className={className}
          disabled={disabled}
          name={input.name}
          onFocus={input.onFocus}
          onChange={input.onChange}
          onBlur={input.onBlur}
          value={input.value}
          style={style}
          min={min}
          max={max}
          step={step}
        />
      </FieldWrapper>
    );
  }
}
