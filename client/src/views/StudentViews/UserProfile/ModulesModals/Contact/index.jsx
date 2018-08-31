import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Field } from 'redux-form';
import { Input } from 'components/reduxFormFields';
import ModalBase from '../ModalBase';
import { required } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';

class Contatct extends PureComponent {
  render() {
    const { visible, onClose, name, icon } = this.props;
    return (
      <ModalBase
        {...getModalBaseData(this.props)}
      >
        sdfsdfsdf
      </ModalBase>
    );
  }
}

Contatct.propTypes = {
  text: string,
};

Contatct.defaultProps = {
  text: 'Contact',
};

export default Contatct;
