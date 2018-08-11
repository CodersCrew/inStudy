import styled from 'styled-components';
import { media } from 'CC-UI/lib/utils';

export const Container = styled.div`
  position: relative;
  width: 800px;
  height: 64px;
  background-color: var(--white);
  border-radius: 4px;
  ${media.md`width: calc(100vw - 128px);`};
  ${media.sm`height: 56px;`};
  ${media.xs`height: 48px; width: calc(100vw - var(--space-xl));`};
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 0 var(--space-lg);
  border-radius: 4px;
  font-size: 20px;
  font-family: var(--mainFont);
  color: var(--text1);
  ${media.sm`font-size: var(--font-lg);`};
  ${media.xs`font-size: var(--font-md); padding: 0 var(--space-md);`};

  &::placeholder {
    color: var(--grey5);
  }
`;

export const Icon = styled.i`
  position: absolute;
  top: 0;
  bottom: 0;
  right: var(--space-lg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-xl);
  color: var(--grey4);
  transition: all 0.3s var(--ease-in-out);
  ${media.xs`font-size: var(--font-md); right: var(--space-md);`};

  &:hover {
    color: var(--grey6);
  }

  &:active {
    color: var(--grey3);
  }
`;
