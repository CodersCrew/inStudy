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
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-lg);
`;

export const EditCard = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  grid-gap: var(--space-sm);
  border: 1px solid var(--primary3);
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow3);

  .ant-row.ant-form-item {
    margin-bottom: 0;
  }

  > div:nth-of-type(1) {
    grid-area: 1/1/3/2;
  }

  > div:nth-of-type(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-of-type(3) {
    grid-area: 2/2/3/3;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-area: 3/1/4/3;
  align-self: end;
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
  min-height: 120px;
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
    bottom: 48px;
    font-family: 'Font Awesome 5 Pro', sans-serif;
    font-size: var(--font-xxl);
  }

  &::after {
    content: 'Dodaj kolejne logo';
    top: 48px;
    bottom: 0;
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
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
  display: grid;
  grid-template-columns: 72px 1fr;
  grid-template-rows: fit-content(100%) 1fr 21px;
  grid-gap: var(--space-xs) var(--space-sm);
  max-height: 288px;
  border: 1px solid var(--grey3);
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow3);
`;

export const Image = styled.div`
  grid-area: 1/1/3/2;
  background: url('${props => props.src}') no-repeat center/contain;
  border-radius: 4px;
`;

export const Name = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--medium);
  color: var(--text1);
  grid-area: 1/2/2/3;
`;

export const Description = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
  grid-area: 2/2/3/3;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
