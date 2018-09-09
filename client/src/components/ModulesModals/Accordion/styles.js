import styled from 'styled-components';

const disabledActionStyles = `
  color: var(--grey4);
  cursor: default;
  pointer-events: none;

  &:hover,
  &:active {
    text-decoration: none;
    color: var(--grey4);
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-lg);
`;

export const EditCard = styled.div`
  border: 1px solid var(--primary3);
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow3);
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Action = styled.div`
  color: var(--primary3);
  transition: all 0.3s var(--ease-in-out);
  cursor: pointer;

  &:hover {
    color: var(--primary3-hover);
    text-decoration: underline;
  }

  &:active {
    color: var(--primary3-active);
    text-decoration: underline;
  }

  & + div {
    margin-left: var(--space-md);
  }

  ${props => props.isDisabled && disabledActionStyles};
`;

export const AddTrait = styled.div`
  position: relative;
  min-height: 96px;
  border: 1px dashed var(--grey5);
  background-color: var(--white);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &::before,
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--regular);
    color: var(--grey5);
    transition: all 0.3s var(--ease-in-out);
  }

  &::before {
    content: '\f5ff';
    position: absolute;
    top: 0;
    bottom: 32px;
    font-family: 'Font Awesome 5 Pro', sans-serif;
    font-size: var(--font-xl);
  }

  &::after {
    content: 'Dodaj kolejny element';
    top: 32px;
    bottom: 0;
    font-size: var(--font-md);
    line-height: var(--font-md-lh);
  }

  &:hover {
    background-color: var(--white-hover);
    border: 1px solid var(--grey6);

    &::before,
    &::after {
      color: var(--grey4);
    }
  }

  &:active {
    background-color: var(--white-active);
    border: 1px solid var(--grey4);

    &::before,
    &::after {
      color: var(--grey3);
    }
  }
`;

export const StaticCard = styled.div`
  max-height: 240px;
  border: 1px solid var(--grey3);
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow3);
`;

export const Name = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--medium);
  color: var(--text1);
`;

export const Description = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
  overflow-y: hidden;
`;
