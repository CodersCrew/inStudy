import styled from 'styled-components';
import { Input, NumberInput } from 'components/reduxFormFields';
import { Button } from 'antd';

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
  width: 65%;
`;
export const StyledInputNumber = styled(NumberInput)`
  width: 28%;
`;
export const StyledButton = styled(Button)`
  width: 2%;
  margin-top: 4%;
`;

