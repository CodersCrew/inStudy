import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
`;

export const Body = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  height: calc(100% - 40px);

  > div > div:nth-child(1) {
    overflow-x: hidden !important;
    background-color: var(--background);
  }

  > div > div:nth-child(2) {
    display: none;
  }
`;
