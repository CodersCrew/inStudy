import styled from 'styled-components';
import { Button } from 'antd';
import { Input, TextArea } from 'components/reduxFormFields';
import { media } from 'utils';

export const Container = styled.form`
  display: grid;
  grid-template: 'email title title title' 'text text text text' '. . . button';
  grid-gap: 0 20px;
  box-sizing: border-box;
  ${media.md`
    grid-template: 'email email email email' 'title title title title' 'text text text text' '. . . button';
  `};
`;

export const EmailInput = styled(Input)`
  grid-area: email;
`;
export const TitleInput = styled(Input)`
  grid-area: title;
`;

export const ContentTextArea = styled(TextArea)`
  grid-area: text;

  & textarea {
    height: 150px !important;
    resize: none;
  }

  ${media.md`
    & textarea {
      height: 100px !important;
    }
  `};
`;

export const ButtonSubmit = styled(Button)`
  grid-area: button;
  justify-self: end;
  width: 100px;
`;
