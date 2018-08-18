import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    > div:first-child {
      border: 1px solid var(--primary2);
      background-color: var(--primary2);
      i {
        color: var(--white);
      }
    }

    > div:last-child > div:first-child {
      color: var(--primary2);
    }
  }
`;

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  max-height: 48px;
  margin-right: var(--space-sm);
  border-radius: 100%;
  border: 1px solid var(--grey3);
  transition: all 0.3s var(--ease-in-out);

  i {
    color: var(--grey3);
    font-size: var(--font-lg);
    transition: all 0.3s var(--ease-in-out);
  }
`;

export const Content = styled.div`
  text-align: left;
`;

export const Name = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--bold);
  color: var(--text2);
  transition: all 0.3s var(--ease-in-out);
`;

export const Description = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text3);
`;
