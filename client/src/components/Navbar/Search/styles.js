import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  transition: all 0.3s;
  ${props =>
    props.active &&
    `
    width: 360px;
  `} input {
    ${props =>
      props.active &&
      `
      opacity: 1;
    `};
  }

  ${media.md`
    display: none;
  `};
`;

export const Input = styled.input`
  position: absolute;
  right: var(--space-md);
  top: 0;
  bottom: 0;
  width: 100%;
  opacity: 0;
  border: none;
  border-radius: 4px;
  padding: 0 var(--space-lg) 0 var(--space-sm);
  outline: none;
  box-sizing: border-box;
  font-size: var(--font-sm);
  color: var(--text1);
  line-height: 24px;
  transition: all 0.3s;

  &::placeholder {
    color: var(--grey5);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: -2px;
  bottom: 0;
  right: 0;
  transform: scale(0.5);
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: var(--space-md);
  background: var(--white);
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
  }

  &::before {
    width: 19px;
    height: 19px;
    background: var(--customColor);
    border-radius: 10px;
    margin: 3px;
    transform: rotate(45deg);
    transition: all 0.1s ease;
  }

  &::after {
    width: 4px;
    height: 12px;
    background: var(--white);
    border-radius: 4px;
    margin: 19px 0 0 21px;
    transform: rotate(-45deg);
    transition: all 0.2s ease;
  }

  ${props =>
    props.active &&
    `
    top: 0;
    background: var(--grey6);

    &:hover {
      background: var(--grey5);
    }

    &::before {
      background: var(--white);
      width: 3px;
      height: 14px;
      margin: 6px 0 0 11px;
    }

    &::after {
      width: 3px;
      height: 14px;
      background: var(--white);
      margin: 6px 0 0 11px;
    }
  `};
`;
