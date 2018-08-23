import styled from 'styled-components';
import { IconPicker, Input } from 'components/reduxFormFields';

export const Top = styled.div`
  display: flex;
  margin-bottom: var(--space-lg);
`;

export const StyledIconPicker = styled(IconPicker)`
  width: 160px;
  margin-right: var(--space-xl);
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;
