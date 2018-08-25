import React, { PureComponent } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default class SelectField extends PureComponent {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      className,
      style,
      options = [],
    } = this.props;

    return (
      <Select
        className={className}
        onChange={input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        name={input.name}
        placeholder={label}
        value={input.value || undefined}
        error={touched && error}
        style={style}
      >
        {options.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  }
}
