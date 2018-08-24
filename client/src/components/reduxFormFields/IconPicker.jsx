import React, { PureComponent } from 'react';
import { IconPicker } from 'components';

export default class IconPickerField extends PureComponent {
  render() {
    const {
      disabled,
      fullWidth,
      input,
      label,
      meta: { touched, error },
      className,
      style,
    } = this.props;

    return (
      <IconPicker
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        name={input.name}
        onFocus={input.onFocus}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={label}
        value={input.value}
        error={touched && error}
        style={style}
      />
    );
  }
}
