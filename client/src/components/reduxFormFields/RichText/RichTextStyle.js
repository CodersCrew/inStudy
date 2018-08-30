import styled from 'styled-components';
import { Editor } from 'slate-react';

export const StyledEditor = styled(Editor)`
  padding: 11px;
  font-family: 'Roboto', sans-serif;
  font-variant: tabular-nums;
  width: 100%;
  min-height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: #42aaff;
    border-right-width: 1px !important;
  }
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`;

export const Button = styled.span`
  cursor: pointer;
  color: ${props =>
    props.reversed ? (props.active ? '' : '') : props.active ? 'black' : 'rgb(185, 185, 185)'};
  transition: all 0.05s ease;
  &:hover {
    fill: grey;
  }
`;

export const Menu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
`;

export const Bold = styled.span`
  font-weight: 700;
`;

export const Italic = styled.span`
  font-style: italic;
`;

export const Underlined = styled.span`
  text-decoration: underline;
`;

export const BlockQuote = styled.blockquote`
  clear: both;
  color: rgb(160, 160, 160);
  font-size: 14px;
  border-left: solid 1px rgb(160, 160, 160);
  padding-left: 5px;
`;

export const One = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const Two = styled.span`
  font-size: 26px;
  font-weight: bold;
`;

export const Ul = styled.ul`
  margin-left: 10px;
`;

export const Ol = styled.ol`
  margin-left: 10px;
`;
