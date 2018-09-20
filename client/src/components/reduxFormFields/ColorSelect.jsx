import React from 'react';
import { bool, string, func, oneOf, arrayOf, object } from 'prop-types';
import { Select } from 'antd';
import styled from 'styled-components';
import FieldWrapper from './FieldWrapper';

const { Option } = Select;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  margin-right: var(--space-md);
  border-radius: 100%;
  background-color: ${props => props.color};
`;

const SingleSelect = props => (
  <FieldWrapper {...props}>
    <Select
      allowClear={props.allowClear}
      autoFocus={props.autoFocus}
      className={props.className}
      defaultActiveFirstOption={props.defaultActiveFirstOption}
      disabled={props.disabled}
      name={props.input.name}
      notFoundContent={props.notFoundContent}
      placeholder={props.placeholder}
      showSearch={false}
      size={props.size}
      style={props.style}
      value={props.input.value || undefined}
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onSearch={props.input.onSearch}
    >
      {props.colorsList.map(color => (
        <Option key={color} value={color}>
          <OptionWrapper>
            <Circle color={color} />
            {color}
          </OptionWrapper>
        </Option>
      ))}
    </Select>
  </FieldWrapper>
);

SingleSelect.propTypes = {
  allowClear: bool,
  autoFocus: bool,
  className: string,
  defaultActiveFirstOption: bool,
  disabled: bool,
  input: object.isRequired,
  notFoundContent: string,
  colorsList: arrayOf(string),
  placeholder: string,
  size: oneOf(['small', 'default', 'large']),
  style: object,
  onSelect: func,
};

SingleSelect.defaultProps = {
  allowClear: false,
  autoFocus: false,
  className: '',
  defaultActiveFirstOption: true,
  disabled: false,
  notFoundContent: 'Brak wyników',
  colorsList: [],
  placeholder: '',
  size: 'default',
  style: {},
  onSelect: () => {},
};

export default SingleSelect;
