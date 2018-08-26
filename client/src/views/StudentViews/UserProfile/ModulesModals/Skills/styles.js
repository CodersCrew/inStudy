import styled from 'styled-components';
import { Input, NumberInput } from 'components/reduxFormFields';
import { Field } from 'redux-form';

export const Container = styled.div`
  box-sizing: border-box;
`;
export const Li = styled.li`
 list-style-type: none;
`;
export const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledInput = styled(Input)`
  width: 70%;
`;
export const StyledInputNumber = styled(NumberInput)`
  width: 30%;
`;

