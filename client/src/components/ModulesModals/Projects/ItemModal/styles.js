import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 108px 1fr;
  grid-gap: 0 var(--space-xl);

  > div:nth-of-type(1) {
    grid-area: 1/1/3/2;
  }

  > div:nth-of-type(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-of-type(3) {
    grid-area: 2/2/3/3;
  }

  > div:nth-of-type(4) {
    grid-area: 3/1/4/3;
  }

  > div:nth-of-type(5) {
    grid-area: 4/1/5/3;
  }

  > div:nth-of-type(6) {
    grid-area: 5/1/6/3;
  }
`;

export const Actual = styled.div`
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--text1);
    background-color: var(--grey7);
  }

  &:active {
    background-color: var(--grey6);
  }
`;

export const TrashIcon = styled.i.attrs({
  className: 'fal fa-trash-alt',
})`
  color: var(--grey2);
  transition: all 0.3s var(--ease-in-out);
  cursor: pointer;

  &:hover {
    color: var(--error);
  }
`;

export const Label = styled.div`
  padding: 0 0 var(--space-xs) var(--space-xs);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--medium);
  color: var(--text2);
`;

export const Socials = styled.div`
  box-sizing: border-box;
`;

export const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0 var(--space-md);

  > div:first-of-type {
    grid-area: 1/1/2/6;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: ${props => props.preview ? 'rgba(0, 0, 0, 0.3)' : 'var(--white)'};
  transition: all 0.3s var(--ease-in-out);

  i {
    font-size: var(--font-lg);
    color: ${props => (props.preview ? 'var(--white)' : 'var(--grey4)')};
    transition: all 0.3s var(--ease-in-out);
  }

  &:hover {
    background-color: ${props => (props.preview ? 'rgba(0, 0, 0, 0.75)' : 'var(--white)')};

    i {
      color: ${props => (props.preview ? 'var(--white)' : 'var(--grey3)')};
    }
  }
`;
