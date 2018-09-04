import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: var(--space-lg) var(--space-xl) var(--space-xl);
  background-color: var(--white);
  box-shadow: var(--shadow2);
  border-radius: 4px;
  ${media.md`
    margin-top: var(--space-xl);
    padding: var(--space-md) var(--space-lg) var(--space-lg);
  `};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Icon = styled.h1`
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  color: var(--primary2);
  ${media.xl`
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
  `};
`;

export const Text = styled.h1`
  font-family: var(--headerFont);
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  font-weight: var(--bold);
  color: var(--text1);
  margin-left: var(--space-lg);
  ${media.xl`
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
    margin-left: var(--space-md);
  `};
  ${media.md`
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
  `};
`;

export const Content = styled.div`
  margin-top: var(--space-lg);
`;

export const EditIcon = styled.div`
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: var(--font-xl);
  color: var(--grey5);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--grey6);
  }

  &:active {
    color: var(--grey4);
  }
`;