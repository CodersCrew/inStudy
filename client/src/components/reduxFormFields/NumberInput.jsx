import React, { PureComponent } from 'react';
import { NumberInput } from 'CC-UI';

export default class InputField extends PureComponent {
  render() {
    const {
      disabled,
      fullWidth,
      input,
      label,
      meta: { touched, error },
      className,
      validating,
      type,
      style,
    } = this.props;

    return (
      <NumberInput
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        name={input.name}
        onFocus={input.onFocus}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={label}
        value={input.value}
        type={type}
        error={touched && error}
        style={style}
      />
    );
  }
}
