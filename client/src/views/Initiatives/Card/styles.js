import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: var(--shadow1);

  &:hover {
    .moreIcon {
      opacity: 1;
    }
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 2px solid var(--primary2);
  padding: var(--space-md) var(--space-lg);
  line-height: 24px;
`;

export const Title = styled.h3`
  margin-right: auto;
  font-size: 20px;
  font-family: var(--headerFont);
  color: var(--text1);
`;

export const MoreIcon = styled.i`
  cursor: pointer;
  font-size: var(--font-xl);
  color: var(--grey5);
  opacity: 0;
  transition: all 0.3 var(--ease-in-out);

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
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  padding-right: var(--space-lg);
  border-right: 1px solid var(--grey7);
`;

export const Logo = styled.div`
  min-width: 136px;
  min-height: 136px;
  background: url('${props => props.src}') no-repeat center/contain;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: var(--space-lg);
`;

export const Description = styled.div`
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: 1.3;
  color: var(--text2);
`;

export const Footer = styled.div`
  display: flex;
  margin-top: auto;
  padding-top: var(--space-lg);
`;

export const UniversityLogo = styled.img`
  max-height: 32px;
`;

export const FeatureIcons = styled.div`
  margin-left: auto;
`;

export const FeatureIcon = styled.div`
  box-sizing: border-box;
`;
