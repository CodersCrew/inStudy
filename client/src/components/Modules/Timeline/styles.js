import styled from 'styled-components';
import { media } from 'utils';

export const Container = styled.div`
  box-sizing: border-box;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const DateWrapper = styled.div`
  position: relative;
  width: 160px;
  padding: var(--space-md) 19px var(--space-md) 0;
  border-right: 2px solid var(--grey6);
  display: ${props => props.small ? 'none' : 'block'};
  ${media.xs`
    display: ${props => props.small ? 'flex' : 'none'};
    border-right: none;
    padding: 0;
  `}
`;

export const DateText = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--medium);
  text-align: right;
  color: var(--customColor);
`;

export const Dot = styled.div`
  position: absolute;
  right: -13px;
  top: 16px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 2px solid var(--customColor);
  ${media.xs`
    display: none;
  `}

  &::before {
    position: absolute;
    content: '';
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 100%;
    background-color: var(--customColor);
  }
`;

export const ContentWrapper = styled.div`
  padding: var(--space-md) 0 var(--space-md) 27px;
  width: calc(100% - 160px);
  ${media.xs`
    width: 100%;
  `}
`;

export const Title = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;

export const Subtitle = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--medium);
  color: var(--text2);
`;

export const Description = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text3);
`;
