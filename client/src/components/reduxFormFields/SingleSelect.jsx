import React, { PureComponent } from 'react';
import { bool, string, func, oneOf, arrayOf, exact, object } from 'prop-types';
import { Select } from 'antd';
import FieldWrapper from './FieldWrapper';

const { Option } = Select;

const filterOptions = (query, option) => option.props.children.includes(query);

class SingleSelect extends PureComponent {
  state = {
    isOpen: false,
  };

  blurIfOpened = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.props.input.onBlur();
    }
  };

  onFocus = () => {
    if (!this.state.isOpen) {
      this.focus();
    }
  };

  onSelect = value => {
    this.props.onSelect(value);
    this.blurIfOpened();
  };

  onChange = value => {
    this.props.input.onChange(value);
    this.blurIfOpened();
  };

  focus = () => {
    this.setState({ isOpen: true });
    this.props.input.onFocus();
  };

  render() {
    const props = this.props;

    return (
      <FieldWrapper {...props}>
        <Select
          allowClear={props.allowClear}
          autoFocus={props.autoFocus}
          defaultActiveFirstOption={props.defaultActiveFirstOption}
          disabled={props.disabled}
          filterOption={filterOptions}
          name={props.input.name}
          notFoundContent={props.notFoundContent}
          placeholder={props.placeholder}
          showSearch={props.showSearch}
          size={props.size}
          value={props.input.value || undefined}
          onBlur={this.blurIfOpened}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onSearch={props.input.onSearch}
          onSelect={this.onSelect}
          open={this.state.isOpen}
        >
          {props.options.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </FieldWrapper>
    );
  }
}

SingleSelect.propTypes = {
  allowClear: bool,
  autoFocus: bool,
  defaultActiveFirstOption: bool,
  disabled: bool,
  input: object.isRequired,
  notFoundContent: string,
  options: arrayOf(
    exact({
      label: string.isRequired,
      value: string.isRequired,
    }),
  ),
  placeholder: string,
  showSearch: bool,
  size: oneOf(['small', 'default', 'large']),
  onSelect: func,
};

SingleSelect.defaultProps = {
  allowClear: false,
  autoFocus: false,
  defaultActiveFirstOption: true,
  disabled: false,
  notFoundContent: 'Brak wyników',
  options: [],
  placeholder: '',
  showSearch: true,
  size: 'default',
  onSelect: () => {},
};

export default SingleSelect;
