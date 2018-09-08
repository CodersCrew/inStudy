import React, { PureComponent } from 'react';
import { bool, string, func, oneOf, arrayOf, exact, object } from 'prop-types';
import { Select } from 'antd';
import FieldWrapper from './FieldWrapper';

const { Option } = Select;

const filterOptions = (query, option) => option.props.children.includes(query);

class TagsSelect extends PureComponent {
  render() {
    const props = this.props;
    console.log(props.input.value);

    return (
      <FieldWrapper {...props}>
        <Select
          mode="tags"
          allowClear={props.allowClear}
          autoFocus={props.autoFocus}
          className={props.className}
          defaultActiveFirstOption={props.defaultActiveFirstOption}
          disabled={props.disabled}
          filterOption={filterOptions}
          name={props.input.name}
          notFoundContent={props.notFoundContent}
          placeholder={props.placeholder}
          showSearch={props.showSearch}
          size={props.size}
          style={props.style}
          value={props.input.value || undefined}
          onBlur={props.input.onBlur}
          onChange={props.input.onChange}
          onFocus={props.input.onFocus}
          onSearch={props.input.onSearch}
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

TagsSelect.propTypes = {
  allowClear: bool,
  autoFocus: bool,
  className: string,
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
  style: object,
  onSelect: func,
};

TagsSelect.defaultProps = {
  allowClear: false,
  autoFocus: false,
  className: '',
  defaultActiveFirstOption: true,
  disabled: false,
  notFoundContent: 'Brak wyników',
  options: [],
  placeholder: '',
  showSearch: true,
  size: 'default',
  style: {},
  onSelect: () => {},
};

export default TagsSelect;
