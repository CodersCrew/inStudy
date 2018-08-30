import styled from 'styled-components';
import { Collapse } from 'react-collapse';
import { Container } from 'components';
import { media } from 'utils';

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  margin: var(--space-xxl) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--headerFont);
  font-size: var(--font-xxl);
  color: var(--text1);
  line-height: var(--font-xxl-lh);

  @media (max-width: 580px) {
    font-size: var(--font-xl);
    margin: var(--space-xl) 0 var(--space-lg);
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 580px) {
    flex-direction: column;
  }
`;

export const Categories = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: var(--space-xl);
  ${media.lg`
  width: 320px;
  `};
  ${media.sm`
    width: 200px;
    margin-right: var(--space-lg);
  `};

  @media (max-width: 580px) {
    width: 100%;
    margin-right: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CategoryCard = styled.div`
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: ${props => (props.active ? 'var(--shadow3)' : 'var(--shadow1)')};
  padding: var(--space-md);
  margin-bottom: var(--space-xl);
  transition: all 0.3s var(--ease-in-out);

  > div > h3 {
    color: ${props => props.active && 'var(--primary2)'};
  }

  > div svg,
  > div path {
    fill: ${props => props.active && 'var(--primary2)'};
  }

  &:hover {
    cursor: ${props => !props.active && 'pointer'};
    box-shadow: ${props => !props.active && 'var(--shadow1)'};
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${media.sm`
    margin-bottom: var(--space-lg);
  `};

  @media (max-width: 580px) {
    margin-bottom: 0;
  }
`;

export const Head = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  h3 {
    color: var(--grey1);
    font-size: var(--font-xl);
    margin-left: var(--space-sm);
    font-family: var(--headerFont);
  }

  ${media.sm`
    svg {
      width: 16px;
      height: 16px;
    }

    h3 {
      font-size: var(--font-lg);
    }
  `};
`;

export const Description = styled.p`
  width: 100%;
  font-size: var(--font-sm);
  color: var(--text3);
  line-height: var(--font-sm-lh);
  margin-top: var(--space-sm);
  ${media.md`
    display: none;
  `};
`;

export const Questions = styled.div`
  width: 100%;
  padding: var(--space-sm) var(--space-xl);
  background-color: var(--white);
  box-shadow: var(--shadow1);
  border-radius: 4px;
  ${media.md`
    padding: var(--space-sm) var(--space-md);
  `};
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Tile = styled.div`
  padding: var(--space-lg) var(--space-md);
  border-bottom: 1px solid var(--grey5);
  ${media.sm`
    padding: var(--space-md) var(--space-sm);
  `};

  &:last-child {
    border-bottom: none;
  }
`;

export const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: var(--medium);
  margin-bottom: ${props => props.isOpened && '8px'};
  transition: all 0.3s var(--ease-in-out);

  h4 {
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
    color: var(--grey2);
    padding-right: var(--space-lg);
    ${media.lg`
      font-size: var(--font-md);
    `};
    ${media.md`
      padding-right: var(--space-md);
    `};
  }

  svg {
    cursor: pointer;

    &:hover {
      cursor: pointer;
      fill: var(--grey3);
    }
  }
`;

export const Answer = styled(Collapse)`
  font-size: var(font-md);
  line-height: var(--font-md-lh);
  color: var(--grey3);
`;
