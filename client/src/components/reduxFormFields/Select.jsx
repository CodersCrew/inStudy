import React, { PureComponent } from 'react';
import { Select } from 'CC-UI';

export default class SelectField extends PureComponent {
  change = value => this.props.input.onChange(value);

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
        onChange={this.change}
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
