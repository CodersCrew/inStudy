import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 4px;
  padding: var(--space-xl);
  box-shadow: var(--shadow2);
  ${media.xl`
    padding: var(--space-lg);
  `};
  ${media.md`
    position: static;
    display: grid;
    grid-column-gap: var(--space-lg);
    grid-template-columns: 160px 1fr;
  `};
  ${media.xs`
    display: flex;
    justify-content: center;
  `};
`;

export const Image = styled.img`
  min-width: 176px;
  min-height: 176px;
  max-width: 176px;
  max-height: 176px;
  border-radius: 100%;
  ${media.xl`
    min-width: 160px;
    min-height: 160px;
    max-width: 160px;
    max-height: 160px;
  `};
  ${media.md`
    grid-area: 1/1/4/2;
    align-self: start;
  `};
  ${media.xs`
    min-width: 120px;
    min-height: 120px;
    max-width: 120px;
    max-height: 120px;
    align-self: center;
    margin-bottom: var(--space-sm);
  `};
`;

export const Name = styled.div`
  padding-top: var(--space-lg);
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  font-weight: var(--bold);
  color: var(--text1);
  text-transform: uppercase;
  text-align: center;
  ${media.xl`
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
  `};
  ${media.md`
    padding-top: var(--space-sm);
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
    text-align: left;
  `};
  ${media.xs`
    text-align: center;
  `};
`;

export const Description = styled.div`
  padding-top: var(--space-md);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  color: var(--text2);
  text-align: center;
  ${media.xl`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `};
  ${media.md`
    padding: 0;
  `};
  ${media.md`
    text-align: left;
  `};
  ${media.xs`
    text-align: center;
  `};
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: var(--space-xl);
  ${media.xl`
    padding-top: var(--space-lg);
  `};
  ${media.md`
    justify-content: flex-start;
  `};
  ${media.xs`
    justify-content: center;
  `};
`;

export const Social = styled.div`
  font-size: var(--font-xl);
  text-align: center;
  color: var(--grey5);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--grey6);
  }

  &:active {
    color: var(--grey4);
  }

  & + div {
    margin-left: var(--space-lg);
  }

  ${media.xl`
    font-size: var(--font-lg);
  `};
`;
