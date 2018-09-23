import styled, { keyframes } from 'styled-components';
import { media } from 'utils';

const gradientAnimation = keyframes`
  0% { background-position: 5% 0%; }
  50% { background-position: 96% 100%; }
  100% { background-position: 5% 0%; }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--space-xxl);
  background: linear-gradient(318deg, var(--primary1), var(--primary2), var(--primary3));
  background-size: 300% 300%;
  animation: ${gradientAnimation} 10s var(--ease-in-out) infinite;
  ${media.sm`
    padding: var(--space-xl);
  `}
  ${media.xs`
    padding: var(--space-lg);
  `}
`;

export const Middlebox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  width: 640px;
  padding: var(--space-xl);
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow2);
`;

export const Header = styled.div`
  padding-bottom: var(--space-sm);
  font-family: var(--headerFont);
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  font-weight: var(--medium);
  text-align: center;
  color: var(--text1);
  ${media.sm`
    font-size: var(--font-xl);
    line-height: var(--font-xl-lh);
  `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding-top: var(--space-md);
  font-family: var(--mainFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--regular);
  color: var(--text2);
  ${media.xs`
    flex-direction: column;
  `}

  i {
    padding-right: var(--space-sm);
    ${media.xs`
      padding: 0 0 var(--space-xs) 0;
    `}
  }

  a {
    color: var(--text2);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    ${media.xs`
      font-size: var(--font-md);
      line-height: var(--font-md-lh);
    `}
  }
`;

export const Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--space-lg);
  margin-top: var(--space-xl);
  ${media.xs`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.color};
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    background-color: ${props => props.color};

    i {
      color: var(--white);
    }
  }

  i {
    color: ${props => props.color};
    font-size: var(--font-xl);
    transition: all 0.3s var(--ease-in-out);
  }
`;
