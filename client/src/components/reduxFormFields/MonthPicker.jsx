import React, { PureComponent } from 'react';
import { bool, string, oneOf, object, func } from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import FieldWrapper from './FieldWrapper';

const { MonthPicker } = DatePicker;

class MonthPickerField extends PureComponent {
  state = {
    open: false,
  };

  togglePicker = () => this.setState(state => ({ open: !state.open }));

  closePicker = () => this.setState({ open: false });

  componentDidUpdate() {
    if (this.isValueString) {
      this.input.picker.input.value = this.props.input.value;
    }
  }

  onBlur = () => {
    this.props.input.onBlur();
  };

  render() {
    const props = this.props;

    this.isValueString = props.input.value && typeof props.input.value === 'string';

    const value = this.isValueString ? moment() : props.input.value || undefined;

    return (
      <FieldWrapper {...props}>
        <MonthPicker
          className={this.isValueString && 'monthpicker-changeValue'}
          disabled={props.disabled}
          format="MM-YYYY"
          name={props.input.name}
          placeholder={props.placeholder}
          onOpenChange={this.togglePicker}
          open={this.state.open}
          renderExtraFooter={() => props.renderExtraFooter(this.closePicker)}
          size={props.size}
          value={value}
          onBlur={this.onBlur}
          onChange={props.input.onChange}
          onFocus={props.input.onFocus}
          ref={input => {
            this.input = input;
          }}
        />
      </FieldWrapper>
    );
  }
}

MonthPickerField.propTypes = {
  disabled: bool,
  input: object.isRequired,
  placeholder: string,
  renderExtraFooter: func,
  size: oneOf(['small', 'default', 'large']),
};

MonthPickerField.defaultProps = {
  disabled: false,
  placeholder: '',
  renderExtraFooter: () => {},
  size: 'default',
};

export default MonthPickerField;
