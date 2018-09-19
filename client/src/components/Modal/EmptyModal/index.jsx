import React from 'react';
import { bool, func, node, number } from 'prop-types';
import { connect } from 'react-redux';
import { StyledModal } from './styles';

const EmptyModal = ({ visible, onCancel, width, children, size, className }) => (
  <StyledModal
    destroyOnClose
    className={className}
    centered={size <= 480}
    closable={false}
    visible={visible}
    onCancel={onCancel}
    width={width}
  >
    {children}
  </StyledModal>
);

EmptyModal.propTypes = {
  visible: bool,
  onCancel: func.isRequired,
  children: node.isRequired,
  width: number,
  size: number.isRequired,
};

EmptyModal.defaultProps = {
  visible: false,
  width: 560,
};

export default connect(state => ({ size: state.ui.size.value }))(EmptyModal);
