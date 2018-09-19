import React from 'react';
import { string, node, object, bool } from 'prop-types';
import { Form } from 'antd';
import styled from 'styled-components';

const FormItem = styled(Form.Item)`
  position: relative;

  .ant-form-item-label {
    padding-bottom: var(--space-xs);
  }

  .ant-form-explain {
    padding-top: var(--space-xs);
  }

  .ant-select.ant-select-enabled,
  .ant-select-selection--multiple,
  .ant-select-selection--multiple > div {
    min-width: 100%;
  }
`;

const getValidateStatus = ({ touched, error }, isValidating) => {
  if (touched && error) {
    return 'error';
  }

  if (isValidating) {
    return 'validating';
  }

  return 'success';
};

const getHelpText = ({ touched, error }, help) => (touched && error ? error : help);

const FieldWrapper = ({ children, className, isValidating, help, label, meta, style }) => (
  <FormItem
    className={className}
    colon={false}
    label={label}
    validateStatus={getValidateStatus(meta, isValidating)}
    help={getHelpText(meta, help)}
    style={style}
  >
    {children}
  </FormItem>
);

FieldWrapper.propTypes = {
  children: node.isRequired,
  className: string,
  isValidating: bool,
  help: string,
  label: string,
  meta: object.isRequired,
  style: object,
};

FieldWrapper.defaultProps = {
  className: '',
  isValidating: false,
  help: '',
  label: '',
  style: {},
};

export default FieldWrapper;
