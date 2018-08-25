import React from 'react';
import { bool, string, func, oneOf, arrayOf, exact, object } from 'prop-types';
import { Select } from 'antd';
import FieldWrapper from './FieldWrapper';

const { Option } = Select;

const filterOptions = (query, option) => option.props.children.includes(query);

const SingleSelect = props => (
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
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onSearch={props.input.onSearch}
      onSelect={props.onSelect}
    >
      {props.options.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  </FieldWrapper>
);

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
