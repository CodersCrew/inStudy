import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'react-ui-framework/lib/utils';

export const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: var(--shadow2);
  transition: all 0.3s var(--ease-out);
  cursor: pointer;
  height: 100%;
  text-decoration: none;

  &:hover {
    box-shadow: var(--shadow1);

    .moreIcon {
      opacity: 1;
    }
  }

  &:active {
    box-shadow: var(--shadow3);

    .moreIcon {
      opacity: 1;
    }
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 3px solid var(--primary2);
  padding: var(--space-md) var(--space-lg);
  line-height: var(--space-lg);
  ${media.xs`
    line-height: var(--space-md);
    padding: var(--space-md);
  `};
`;

export const Title = styled.h3`
  margin-right: auto;
  font-size: 20px;
  font-family: var(--headerFont);
  font-weight: var(--bold);
  color: var(--text1);
  ${media.xs`
    font-size: var(--font-sm);
  `};
`;

export const MoreIcon = styled.i`
  cursor: pointer;
  font-size: var(--font-xl);
  color: var(--grey5);
  opacity: 0;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--grey6);
  }

  &:active {
    color: var(--grey4);
  }
`;

export const Content = styled.div`
  display: flex;
  padding: var(--space-lg);
  height: 100%;
  ${media.xs`
    padding: var(--space-md);
  `};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: var(--space-lg);
  border-right: 1px solid var(--grey7);
  ${media.xs`
    padding-right: var(--space-md);
  `};
`;

export const Logo = styled.div`
  min-width: 136px;
  min-height: 136px;
  background: url('${props => props.src}') no-repeat center/contain;
  ${media.sm`
    min-width: 104px;
    min-height: 104px;
  `};
  ${media.xs`
    min-width: 72px;
    min-height: 72px;
  `};
`;

export const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: var(--space-lg);
  ${media.xs`
    padding-left: var(--space-md);
  `};
`;

export const Description = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: 1.3;
  color: var(--text2);
  ${media.xs`
    font-size: var(--font-xs);
  `};
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  padding-top: var(--space-lg);
`;

export const UniversityLogo = styled.div`
  height: 32px;
  width: 160px;
  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  ${media.sm`
    max-width: 120px;
  `};
  ${media.xs`
    height: 24px;
    max-width: 100%;
  `};
`;

export const FeatureIcons = styled.div`
  display: flex;
  margin-left: auto;
  ${media.xs`
    display: none;
  `};
`;

export const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${props => (props.active ? 'var(--primary2)' : 'var(--grey5)')};
  background-color: ${props => (props.active ? 'var(--primary1)' : '#fff')};
  border-radius: 100%;

  &:not(:last-child) {
    margin-right: 12px;
  }

  i {
    font-size: var(--font-xs);
    color: ${props => (props.active ? '#fff' : 'var(--grey5)')};
  }
`;
