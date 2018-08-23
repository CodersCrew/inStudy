import React, { PureComponent } from 'react';
import { Input } from 'CC-UI';

export default class InputField extends PureComponent {
  state = {
    value: this.props.input.value,
  };

  change = value => this.setState({ value });

  blur = () => {
    this.props.input.onChange(this.state.value);
    this.props.input.onBlur();
  };

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
      <Input
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        name={input.name}
        onFocus={input.onFocus}
        onChange={this.change}
        onBlur={this.blur}
        label={label}
        value={validating ? input.value : this.state.value}
        type={type}
        error={touched && error}
        style={style}
      />
    );
  }
}
