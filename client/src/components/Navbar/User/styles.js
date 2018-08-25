import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import { Button } from 'antd';
import { media } from 'utils';

export const StyledButton = styled(Button)`
  margin-left: var(--space-lg);
  min-width: 104px;
  ${media.sm`
    margin-left: var(--space-md);
  `};
  ${media.xs`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    min-width: 0;
    padding: 0;
    border-radius: 100%;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 14px;
      max-width: 14px;
      min-height: 14px;
      font-size: 12px;
    }
  `};
`;

export const UserImage = styled.img`
  width: 24px;
  height: 24px;
  margin-left: var(--space-lg);
  border-radius: 100%;
  cursor: pointer;
  ${media.sm`
    margin-left: var(--space-md);
  `};
`;

export const StyledTooltip = styled(Tooltip)`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;
