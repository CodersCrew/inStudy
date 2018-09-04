import React from 'react';
import { string } from 'prop-types';
import { omit } from 'utils';
import ComplexModal from './ComplexModal';
import ConfirmationModal from './ConfirmationModal';
import EmptyModal from './EmptyModal';

const Modal = props => {
  const modalProps = omit(props, ['type']);
  const { type } = props;

  switch (type) {
    case 'confirmation':
      return <ConfirmationModal {...modalProps} />;
    case 'empty':
      return <EmptyModal {...modalProps} />;
    default:
      return <ComplexModal {...modalProps} />;
  }
};

Modal.propTypes = {
  type: string,
};

Modal.defaultProps = {
  type: 'complex',
};

export default Modal;
