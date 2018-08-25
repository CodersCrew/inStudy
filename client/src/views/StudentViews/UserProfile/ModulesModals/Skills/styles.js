import styled from 'styled-components';
import { Input } from 'components/reduxFormFields';
import {NumberInput} from 'CC-UI';

export const Container = styled.div`
  box-sizing: border-box;
`;
export const StyledInput = styled(Input)`
  width: 70%;
`;
export const StyledNumberInput = styled(NumberInput)`
  width: 100%;
`;

