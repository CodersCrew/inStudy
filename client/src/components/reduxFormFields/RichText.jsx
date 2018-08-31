import React from 'react';
import { bool, string, func, oneOfType, object, shape, number } from 'prop-types';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { editorStyles } from './styles';
import FieldWrapper from './FieldWrapper';

const StyledReactQuill = styled(ReactQuill)`
  ${editorStyles};
`;

const RichText = props => (
  <FieldWrapper {...props}>
    <StyledReactQuill
      readOnly={props.disabled}
      value={props.input.value}
      onChange={props.input.onChange}
      placeholder={props.placeholder}
      // onBlur={props.input.onBlur}
      // onFocus={props.input.onFocus}
    />
  </FieldWrapper>
);

RichText.propTypes = {
  autosize: oneOfType([bool, shape({ minRows: number, maxRows: number })]),
  className: string,
  disabled: bool,
  input: object.isRequired,
  placeholder: string,
  onPressEnter: func,
};

RichText.defaultProps = {
  autosize: { minRows: 3, maxRows: 10 },
  className: '',
  disabled: false,
  placeholder: '',
  onPressEnter: () => {},
};

export default RichText;
