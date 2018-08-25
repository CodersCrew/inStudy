import React, { PureComponent } from 'react';
import { bool, string, oneOf, object } from 'prop-types';
import { IconPicker } from 'components';
import FieldWrapper from './FieldWrapper';

class IconPickerField extends PureComponent {
  render() {
    const { disabled, input, placeholder, size } = this.props;

    return (
      <FieldWrapper {...this.props}>
        <IconPicker
          disabled={disabled}
          name={input.name}
          placeholder={placeholder}
          size={size}
          value={input.value}
          onBlur={input.onBlur}
          onChange={input.onChange}
          onFocus={input.onFocus}
        />
      </FieldWrapper>
    );
  }
}

IconPickerField.propTypes = {
  disabled: bool,
  input: object.isRequired,
  placeholder: string,
  size: oneOf(['small', 'default', 'large']),
};

IconPickerField.defaultProps = {
  disabled: false,
  placeholder: '',
  size: 'default',
};

export default IconPickerField;
