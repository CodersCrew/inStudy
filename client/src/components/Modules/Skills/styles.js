import styled, { keyframes } from 'styled-components';
import { Tooltip } from 'react-tippy';

const growToFullWidth = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-xl) var(--space-xxl);
  padding: var(--space-sm) var(--space-md) var(--space-md);
`;

export const Skill = styled.div`
  box-sizing: border-box;
`;

export const SkillName = styled.h5`
  padding-left: 2px;
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--medium);
  color: var(--text1);
`;

export const SkillBar = styled.div`
  display: flex;
  width: 100%;
  height: 8px;
  background-color: var(--grey5);
`;

export const Bar = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--primary2);
  animation: ${growToFullWidth} 1.2s var(--ease-in-out);
`;

export const StyledTooltip = styled(Tooltip)`
  width: ${props => props.width};
`;
