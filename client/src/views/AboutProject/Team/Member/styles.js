import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

export const Name = styled.div`
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  padding-top: var(--space-sm);
  font-weight: var(--medium);
  color: var(--text1);
`;

export const Role = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;

export const Image = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    background: url('${props => props.src}') no-repeat center/cover;
  }
`;
