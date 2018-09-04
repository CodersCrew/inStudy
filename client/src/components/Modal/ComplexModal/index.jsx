import React from 'react';
import { string, bool, func, arrayOf, object, node, number } from 'prop-types';
import { Button } from 'antd';
import { StyledModal, TitleContainer, Icon, TitleText } from './styles';

const renderTitle = (iconClass, title) => (
  <TitleContainer>
    {iconClass && <Icon className={iconClass} />}
    <TitleText>{title}</TitleText>
  </TitleContainer>
);

const renderButtons = (buttons = []) =>
  buttons.reverse().map(button => (
    <Button key={button.label} {...button}>
      {button.label}
    </Button>
  ));

const ComplexModal = ({ visible, iconClass, title, onCancel, width, buttons, children }) => (
  <StyledModal
    destroyOnClose
    visible={visible}
    title={renderTitle(iconClass, title)}
    onCancel={onCancel}
    width={width}
    footer={renderButtons(buttons)}
  >
    {children}
  </StyledModal>
);

ComplexModal.propTypes = {
  iconClass: string,
  title: string.isRequired,
  visible: bool,
  onCancel: func.isRequired,
  buttons: arrayOf(object),
  children: node.isRequired,
  width: number,
};

ComplexModal.defaultProps = {
  iconClass: '',
  visible: false,
  buttons: null,
  width: 560,
};

export default ComplexModal;
