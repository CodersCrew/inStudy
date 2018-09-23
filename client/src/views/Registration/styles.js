import styled from 'styled-components';
import { Button } from 'antd';
import { SVGIcon } from 'components';
import { Link } from 'react-router-dom';
import { media } from 'utils';

export const Container = styled.div`
  background-color: var(--primary2);
  background-size: cover;
  opacity: 0.95;
  height: 100%;
  ${media.xl`
    height: 100%;
  `}
  ${media.md`
    height: 100vmax;
  `}
  ${media.sm`
    height: initial;
  `}
`;

export const Background = styled.div`
  background: url(/img/bg-registration.jpg);
  background-size: cover;
  height: 100%;
  ${media.xl`
    height: 100%;
  `}
  ${media.md`
    height: 100vmax;
  `}
  ${media.sm`
    height: initial;
  `}
`;
export const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15% 30%;
  text-align: center;
  color: var(--white);
  ${media.sm`
     padding: 40% 25%;
  `}
  ${media.xs`
     padding: 50% 25%;
  `}
`;

export const MainText = styled.div`
  color: var(--white);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  font-weight: var(--medium);
  margin-bottom: 3%;
`;

export const MiddleText = styled.div`
  color: var(--white);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  margin-bottom: 10%;
`;

export const CautionText = styled.div`
  color: var(--white);
  margin: 20px auto;
`;

export const StyledSVGIcon = styled(SVGIcon)`
  margin-right: 25%;
`;

export const StyledButton = styled(Button)`
  display: flex !important;
  align-items: center;
  margin: 0 auto;
  max-width: 240px;
`;

export const StyledLink = styled(Link)`
  color: var(--white);
  margin: 0 3px;
`;
