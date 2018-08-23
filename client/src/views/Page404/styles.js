import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  background-color: hsla(211, 92%, 44%, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  text-align: center;
`;

export const Error = styled.div`
  font-family: var(--headerFont);
  font-size: 200px;
  line-height: 1;
  margin-bottom: 16px;

  @media (max-width: 580px) {
    font-size: 168px;
  }
`;

export const Description = styled.div`
  margin-bottom: 32px;
  font-size: 32px;
  line-height: 1.3;
`;
