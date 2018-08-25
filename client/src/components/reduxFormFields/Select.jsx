import React, { PureComponent } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

export default class SelectField extends PureComponent {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      placeholder,
      className,
      style,
      options = [],
    } = this.props;

    return (
      <FormItem
        label={label}
        validateStatus={touched && error ? 'error' : 'success'}
        help={touched && error ? error : undefined}
      >
        <Select
          className={className}
          onChange={input.onChange}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          name={input.name}
          placeholder={placeholder}
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
      </FormItem>
    );
  }
}
