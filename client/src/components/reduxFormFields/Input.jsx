import React, { PureComponent } from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default class InputField extends PureComponent {
  render() {
    const {
      disabled,
      input,
      label,
      meta: { touched, error },
      placeholder,
      className,
      validating,
      type,
      style,
    } = this.props;

    return (
      <FormItem
        label={label}
        validateStatus={touched && error ? 'error' : 'success'}
        help={touched && error ? error : undefined}
      >
        <Input
          className={className}
          disabled={disabled}
          name={input.name}
          onFocus={input.onFocus}
          onChange={input.onChange}
          onBlur={input.onBlur}
          value={input.value}
          placeholder={placeholder}
          type={type}
          style={style}
        />
      </FormItem>
    );
  }
}
