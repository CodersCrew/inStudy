import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Field } from 'redux-form';
import ModalBase from '../ModalBase';
import { RichTextEditor } from 'components/reduxFormFields';

class RichText extends PureComponent {
  render() {
    const { visible, onClose, name, icon } = this.props;
    return (
      <ModalBase visible={visible} onClose={onClose} name={name} icon={icon}>
        <Field
          component={RichTextEditor}
          name="description"
          props={{ label: 'Treść', fullWidth: true }}
        />
      </ModalBase>
    );
  }
}

RichText.propTypes = {
  text: string,
};

RichText.defaultProps = {
  text: 'Rich Text',
};

export default RichText;
