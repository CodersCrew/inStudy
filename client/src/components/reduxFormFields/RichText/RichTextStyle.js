import React from 'react';
import styled from 'styled-components';
import { Editor } from 'slate-react';

export const StyledEditor = styled(Editor)`
  margin: var(--space-xs) 0;
  padding: 11px;
  font-family: 'Roboto', sans-serif;
  font-variant: tabular-nums;
  width: 100%;
  height: 200px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: #42aaff;
    border-right-width: 1px !important;
  }
`;

export const Button = styled.span`
  cursor: pointer;
  color: ${props =>
    props.reversed ? (props.active ? 'white' : '#aaa') : props.active ? 'black' : '#ccc'};
  transition: all 0.5 s ease;
  &:hover {
    color: blue;
  }
`;

export const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />;
})`
  font-size: 15px;
  vertical-align: text-bottom;
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
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
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
  background-color: rgb(214, 214, 214);
  font-size: 14px;
  border-left: solid 1px black;
  padding-left: 5px;
`;

export const One = styled.span`
  font-size: 20px;
`;

export const Two = styled.span`
  font-size: 24px;
`;
