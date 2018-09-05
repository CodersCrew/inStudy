import React from 'react';
import { bool, func, node, number } from 'prop-types';
import { StyledModal } from './styles';

const EmptyModal = ({ visible, onCancel, width, children }) => (
  <StyledModal destroyOnClose closable={false} visible={visible} onCancel={onCancel} width={width}>
    {children}
  </StyledModal>
);

EmptyModal.propTypes = {
  visible: bool,
  onCancel: func.isRequired,
  children: node.isRequired,
  width: number,
};

EmptyModal.defaultProps = {
  visible: false,
  width: 560,
};

export default EmptyModal;
