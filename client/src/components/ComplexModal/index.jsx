import React, { PureComponent } from 'react';
import { string, bool, func, arrayOf, object, node, number } from 'prop-types';
import { Button } from 'antd';
import { StyledModal, TitleContainer, Icon, TitleText } from './styles';

class ComplexModal extends PureComponent {
  render() {
    const title = (
      <TitleContainer>
        {this.props.iconClass && <Icon className={this.props.iconClass} />}
        <TitleText>{this.props.title}</TitleText>
      </TitleContainer>
    );
    return (
      <StyledModal
        destroyOnClose
        visible={this.props.visible}
        title={title}
        onCancel={this.props.onCancel}
        width={this.props.width}
        footer={this.props?.buttons?.reverse().map(button => (
          <Button key={button.label} {...button}>
            {button.label}
          </Button>
        ))}
      >
        {this.props.children}
      </StyledModal>
    );
  }
}

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
