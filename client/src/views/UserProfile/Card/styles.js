import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 104px;
  left: calc(50vw - 752px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  width: 352px;
  padding: var(--space-xxl) var(--space-xl);
  box-shadow: var(--shadow1);
`;

export const Image = styled.img`
  width: 224px;
  height: 224px;
  border-radius: 100%;
`;

export const Name = styled.div`
  padding-top: var(--space-lg);
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: 1.2;
  font-weight: var(--bold);
  color: var(--text1);
  text-transform: uppercase;
  text-align: center;
`;

export const Description = styled.div`
  padding-top: var(--space-md);
  font-size: var(--font-md);
  line-height: 1.4;
  color: var(--text2);
  text-align: center;
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: var(--space-lg);
`;

export const Social = styled.div`
  font-size: var(--font-lg);
  text-align: center;
  color: var(--grey5);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    color: var(--grey6);
  }

  &:active {
    color: var(--grey4);
  }

  & + div {
    margin-left: var(--space-lg);
  }
`;
