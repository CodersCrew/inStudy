import React, { PureComponent } from 'react';
import { string, node, object, bool } from 'prop-types';
import { Form } from 'antd';

const FormItem = Form.Item;

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

class FieldWrapper extends PureComponent {
  render() {
    const { children, className, isValidating, help, label, meta, style } = this.props;

    return (
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
  }
}

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
