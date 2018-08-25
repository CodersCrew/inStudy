import React from 'react';
import { string, array, node, func, number, bool } from 'prop-types';
import sizeMe from 'react-sizeme';
import { SVGIcon } from 'components';
import { Button } from 'antd';
import { Dialog, Header, Title, Content, Footer } from '../styles';
import { StyledCloseButton } from './styles';

const sizeMeHOC = sizeMe({
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: 100,
});

const SimpleDialog = ({
  animationName,
  animationType,
  buttons,
  children,
  color,
  duration,
  icon,
  onClose,
  showCloseButton,
  size,
  title,
  width,
}) => (
  <Dialog
    width={width}
    duration={duration}
    animationName={animationName}
    animationType={animationType}
    color={color}
    overSize={window.innerHeight < size.height + 80}
  >
    {showCloseButton && <StyledCloseButton className="fal fa-times" onClick={onClose} />}
    <Header>
      {icon && <SVGIcon path={icon} fill={color} width={24} height={24} />}
      <Title>{title}</Title>
    </Header>
    <Content>{children}</Content>
    {buttons.length > 0 && (
      <Footer>
        {buttons.map(button => (
          <Button key={button.label} {...button}>
            {button.label}
          </Button>
        ))}
      </Footer>
    )}
  </Dialog>
);

SimpleDialog.propTypes = {
  animationName: string.isRequired,
  animationType: string.isRequired,
  buttons: array.isRequired,
  children: node.isRequired,
  color: string.isRequired,
  duration: number.isRequired,
  icon: string.isRequired,
  onClose: func.isRequired,
  showCloseButton: bool.isRequired,
  title: string.isRequired,
  width: number.isRequired,
};

export default sizeMeHOC(SimpleDialog);
