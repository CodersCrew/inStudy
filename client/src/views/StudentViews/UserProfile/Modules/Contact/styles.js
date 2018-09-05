import styled from 'styled-components';
import { Button } from 'antd';
import { Input, TextArea } from 'components/reduxFormFields';

export const Container = styled.form`
  display: grid;
  grid-template: 'email title title title' 'text text text text' '. . . button';
  column-gap: 30px;
  box-sizing: border-box;
`;

export const EmailInput = styled(Input)`
  grid-area: email;
`;
export const TitleInput = styled(Input)`
  grid-area: title;
`;

export const ContentTextArea = styled(TextArea)`
  grid-area: text;
`;

export const ButtonSubmit = styled(Button)`
  grid-area: button;
  justify-self: end;
  width: 100px;
`;
