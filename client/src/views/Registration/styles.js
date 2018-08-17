import styled from 'styled-components';
import { SVGIcon, Button} from 'CC-UI';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  box-sizing: border-box;
  background-color: var(--primary2);
  height: 100%;
  opacity: 0.95;
`;
export const Message = styled.div`
  position: absolute;
  top: 260px;
  left: 31%;
  right: 31%;
  text-align: center;
  color: #fff;
  font-family: Raleway, sans-serif;
`;
export const MainText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  line-height: 33px;
  margin-bottom: 3%;
`;
export const MiddleText = styled.div`
  color: #fff;
  font-size: 22px;
  margin-bottom: 10%;
`;
export const CautionText = styled.div`
  color: #fff;
  margin-bottom: 20px;
`;
export const StyledSVGIcon = styled(SVGIcon)`
  margin-right: 25%;
`;
export const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
`;
export const StyledLink = styled(Link)`
  color: #fff;
`;


