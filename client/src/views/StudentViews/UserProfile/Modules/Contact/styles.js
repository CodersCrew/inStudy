import styled from 'styled-components';
import { Button } from 'antd';
import { Input, TextArea } from 'components/reduxFormFields';
import { media } from 'utils';

export const Container = styled.form`
  display: grid;
  grid-template: 'a b b b' 'c c c c' '. . . d';
  grid-gap: 0 20px;
  box-sizing: border-box;
  ${media.md`
    grid-template: 'a a a a' 'b b b b' 'c c c c' '. . . d';
  `};
`;

export const EmailInput = styled(Input)`
  grid-area: a;
`;
export const TitleInput = styled(Input)`
  grid-area: b;
`;

export const ContentTextArea = styled(TextArea)`
  grid-area: c;

  textarea {
    height: 150px !important;
    resize: none;
  }

  ${media.md`
    textarea {
      height: 100px !important;
    }
  `};
`;

export const ButtonSubmit = styled(Button)`
  grid-area: d;
  justify-self: end;
  width: 100px;
`;
