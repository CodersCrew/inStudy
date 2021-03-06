import styled from 'styled-components';
import { Button, Avatar } from 'antd';
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
    padding: 0 !important;
    border-radius: 100%;

    span {
      top: -2px !important;
      min-width: 14px;
      max-width: 14px;
      min-height: 14px;
      font-size: 12px;
    }
  `};
`;

export const UserImage = styled(Avatar)`
  margin-left: var(--space-lg) !important;
  cursor: pointer;
  ${media.sm`
    margin-left: var(--space-md) !important;
  `};
`;
