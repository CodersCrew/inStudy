import styled from 'styled-components';
import { Button } from 'antd';
import { media } from 'utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--space-xs);
  ${media.xl`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${media.sm`
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--space-md);
  `}
`;

export const ProjectContainer = styled.div`
  position: relative;
  padding-top: 56.25%;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--white);
    border: 1px solid var(--grey6);
  }

  &:hover {
    > div > div:nth-of-type(1) {
      opacity: 0.05;
    }

    > div > div:nth-of-type(2) {
      opacity: 1;
      top: var(--space-xl);
      ${media.lg`
        top: var(--space-lg);
      `}
      ${media.xs`
        top: var(--space-md);
      `}
    }

    > div > button {
      opacity: 1;
      bottom: var(--space-xl);
      ${media.lg`
        bottom: var(--space-lg);
      `}
      ${media.xs`
        bottom: var(--space-md);
      `}
    }
  }
`;

export const Card = styled.div`
  background: url('${props => props.src}') no-repeat center/cover;
  max-width: 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: opacity 0.3s var(--ease-in-out);
`;

export const Text = styled.div`
  z-index: 2;
  text-align: center;
  opacity: 0;
  transition: all 0.3s var(--ease-in-out);
  color: var(--text1);
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  padding: 0 var(--space-md);
  ${media.xs`
    padding: 0 var(--space-sm);
  `}
`;

export const Name = styled.div`
  margin-bottom: var(--space-sm);
  font-weight: var(--medium);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  color: var(--text1);
  ${media.lg`
    font-size: var(--font-md);
    line-height: var(--font-md-lh);
    margin-bottom: 0;
  `}
`;

export const Header = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text1);
  ${media.lg`
    font-size: var(--font-xs);
    line-height: var(--font-xs-lh);
  `}
  ${media.md`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `}
  ${media.xs`
    font-size: var(--font-xs);
    line-height: var(--font-xs-lh);
  `}
`;

export const StyledButton = styled(Button)`
  bottom: 0;
  left: calc(50% - 36px);
  right: calc(50% - 36px);
  position: absolute !important;
  background-color: var(--customColor) !important;
  border-color: var(--customColor) !important;
  z-index: 2;
  opacity: 0;
  transition: all 0.3s var(--ease-in-out);
`;
