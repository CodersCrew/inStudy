import React, { PureComponent } from 'react';
import { Select } from 'CC-UI';

export default class SelectField extends PureComponent {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      className,
      style,
      items,
    } = this.props;

    return (
      <Select
        className={className}
        onChange={input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        label={label}
        name={input.name}
        items={items}
        value={input.value}
        error={touched && error}
        style={style}
      />
    );
  }
}
