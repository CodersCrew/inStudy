import React from 'react';
import { string, array, node, func, number, bool } from 'prop-types';
import sizeMe from 'react-sizeme';
import { SVGIcon } from 'components';
import { Button } from 'antd';
import {
  StyledCloseButton,
  StyledDialog,
  StyledTitle,
  StyledContent,
  StyledFooter,
} from './styles';

const sizeMeHOC = sizeMe({
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: 100,
});

const ConfirmDialog = ({
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
  <StyledDialog
    width={width}
    duration={duration}
    animationName={animationName}
    animationType={animationType}
    color={color}
    overSize={window.innerHeight < size.height + 80}
  >
    {showCloseButton && <StyledCloseButton className="fal fa-times" onClick={onClose} />}
    {icon && <SVGIcon path={icon} fill={color} width={48} height={48} />}
    <StyledTitle>{title}</StyledTitle>
    <StyledContent>{children}</StyledContent>
    {buttons.length > 0 && (
      <StyledFooter>
        {buttons.map(button => (
          <Button key={button.label} {...button}>
            {button.label}
          </Button>
        ))}
      </StyledFooter>
    )}
  </StyledDialog>
);

ConfirmDialog.propTypes = {
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

export default sizeMeHOC(ConfirmDialog);
