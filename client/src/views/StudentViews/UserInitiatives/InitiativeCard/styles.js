import styled from 'styled-components';
import Avatar from 'react-avatar';

export const Container = styled.div`
  padding: var(--space-lg);
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: var(--shadow2);
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Logo = styled.div`
  max-width: 96px;
  max-height: 96px;
  min-width: 96px;
  min-height: 96px;
  border-radius: 4px;
  background: url('${props => props.src}') no-repeat center/contain;
`;

export const StyledAvatar = styled(Avatar)`
  max-width: 96px;
  max-height: 96px;
  min-width: 96px;
  min-height: 96px;
  border-radius: 4px;
`;

export const HeaderTexts = styled.div`
  padding-left: var(--space-lg);
`;

export const Role = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;

export const Name = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--primary2);
`;

export const Time = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--medium);
  color: var(--text2);
`;

export const Description = styled.div`
  padding: var(--space-md) 0;
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text1);
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
