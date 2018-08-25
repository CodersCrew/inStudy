import React, { PureComponent } from 'react';
import { Input } from 'antd';

export default class InputField extends PureComponent {
  render() {
    const {
      disabled,
      input,
      label,
      meta: { touched, error },
      className,
      validating,
      type,
      style,
    } = this.props;

    return (
      <Input
        className={className}
        disabled={disabled}
        name={input.name}
        onFocus={input.onFocus}
        onChange={input.onChange}
        onBlur={input.onBlur}
        value={input.value}
        placeholder={label}
        type={type}
        error={touched && error ? error : undefined}
        style={style}
      />
    );
  }
}
