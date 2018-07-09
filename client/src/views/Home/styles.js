import styled from 'styled-components';
import Particles from 'react-particles-js';
import { Button } from 'react-ui-framework';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const StyledParticles = styled(Particles)`
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  canvas {
    background-color: var(--primary2);
  }
`;

export const CenterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 296px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: var(--shadow1);
`;

export const Title = styled.div`
  width: 256px;
  margin-bottom: var(--space-xl);
  font-size: var(--font-xxl);
  line-height: var(--font-xxl-lh);
  text-align: center;
  color: var(--text1);
`;

export const StyledButton = styled(Button)`
  display: flex;
  width: 312px;
  height: 64px;
  padding: 0 var(--space-xs);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  min-height: 56px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: var(--font-lg);
  text-align: center;
  font-weight: var(--medium);
  color: #fff;
`;
