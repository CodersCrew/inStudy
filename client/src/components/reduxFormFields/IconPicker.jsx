import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { IconPicker } from 'components';

const FormItem = Form.Item;

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
      placeholder,
    } = this.props;

    return (
      <FormItem
        label={label}
        validateStatus={touched && error ? 'error' : 'success'}
        help={touched && error ? error : undefined}
      >
        <IconPicker
          className={className}
          disabled={disabled}
          fullWidth={fullWidth}
          name={input.name}
          onFocus={input.onFocus}
          onChange={input.onChange}
          onBlur={input.onBlur}
          placeholder={placeholder}
          value={input.value}
          error={touched && error}
          style={style}
        />
      </FormItem>
    );
  }
}
