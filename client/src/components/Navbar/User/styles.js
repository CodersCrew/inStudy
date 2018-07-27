import styled from 'styled-components';
import { Button } from 'react-ui-framework';
import { media } from 'react-ui-framework/lib/utils';

export const StyledButton = styled(Button)`
  margin-left: var(--space-lg);
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
