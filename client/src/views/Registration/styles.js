import styled from 'styled-components';
import { Button } from 'antd';
import { SVGIcon } from 'components';
import { media } from 'utils';

export const Container = styled.div`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(/img/bg-registration.jpg) no-repeat center/cover;
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary2);
    opacity: 0.95;
    z-index: -1;
  }
`;
export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin-top: -80px;
  text-align: center;
  color: var(--white);
  ${media.sm`
    margin-top: 0;
    width: 100%;
    padding: 0 var(--space-lg);
  `}
  ${media.xs`
    padding: 0 var(--space-md);
  `}
`;

export const MainText = styled.div`
  margin-bottom: var(--space-md);
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  font-weight: var(--medium);
  color: var(--white);
  ${media.sm`
    font-size: var(--font-lg);
    line-height: var(--font-lg-lh);
  `}
`;

export const MiddleText = styled.div`
  margin-bottom: var(--space-xxl);
  font-family: var(--mainFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--regular);
  color: var(--white);
  ${media.sm`
    margin-bottom: var(--space-xl);
    font-size: var(--font-md);
    line-height: var(--font-md-lh);
  `}
  ${media.xs`
    margin-bottom: var(--space-lg);
  `}
`;

export const CautionText = styled.div`
  margin-bottom: var(--space-md);
  font-family: var(--mainFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--white);
  ${media.sm`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `}
`;

export const StyledSVGIcon = styled(SVGIcon)`
  margin-right: var(--space-sm);
`;

export const StyledButton = styled(Button)`
  &.ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    font-weight: var(--medium);

    &:hover,
    &:focus {
      border-color: var(--grey4);
      color: var(--text1);
    }

    &:active {
      border-color: var(--grey3);
      color: var(--text1);
    }
  }
`;

export const StyledLink = styled.a`
  color: var(--white);
  text-decoration: underline;

  &:hover {
    color: var(--white-hover);
    text-decoration: underline;
  }

  &:active {
    color: var(--white-active);
    text-decoration: underline;
  }
`;
