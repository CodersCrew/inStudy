import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 188px 1fr;
  grid-gap: 0 var(--space-xl);

  > div {
    grid-column: 1/3;
  }

  > div:nth-child(1) {
    grid-area: 1/1/4/2;
  }

  > div:nth-child(2) {
    grid-area: 1/2/2/3;
  }

  > div:nth-child(3) {
    grid-area: 2/2/3/3;
  }

  > div:nth-child(4) {
    grid-area: 3/2/4/3;
  }
`;

export const Label = styled.div`
  padding: 0 0 var(--space-xs) var(--space-xs);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--medium);
  color: var(--text2);
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
