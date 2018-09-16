import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .active {
    box-shadow: var(--shadow3);
    margin: var(--space-md) 0;
    border: none;

    > h3 {
      border-radius: 4px 4px 0 0;
      border: 1px solid var(--customColor);
      background-color: var(--customColor);
      color: var(--white);

      > i {
        transform: rotate(180deg);
      }
    }

    .ReactCollapse--content p {
      border: 1px solid var(--grey5);
      border-top: none;
    }
  }
`;

export const Item = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  border-radius: 4px;
  margin: var(--space-xs) 0;

  .ReactCollapse--collapse {
    width: 100%;
  }
`;

export const Title = styled.h3`
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid var(--grey5);
  padding: var(--space-sm) var(--space-lg);
  line-height: 1.4;
  border-radius: 4px;
  margin: 0;
  font-size: var(--font-md);
  font-weight: var(--medium);
  color: var(--grey1);
  ${media.xs`
    padding: var(--space-sm) var(--space-md);
  `}

  i {
    transition: transform 0.3s;
    transform: rotate(0deg);
  }

  p {
    padding-right: var(--space-md);
    margin-bottom: 0;
  }
`;

export const Description = styled.p`
  border-radius: 0 0 4px 4px;
  padding: var(--space-md);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  color: var(--grey2);
  margin: 0;
  ${media.xs`
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-sm);
  `}
`;
