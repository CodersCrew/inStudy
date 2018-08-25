import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: ${props => (props.fullWidth ? '100%' : '256px')};

  input {
    padding-left: 48px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icons = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 320px;

  @media (max-height: 620px) {
    height: 240px;
  }

  > div > div:first-child {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: var(--space-sm);
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${props => (props.active ? 'var(--primary2)' : 'transparent')};
  cursor: ${props => !props.active && 'pointer'};
  transition: all 0.3s var(--ease-in-out);

  i {
    color: ${props => (props.active ? 'var(--white)' : 'var(--grey4)')};
  }

  &:hover {
    background-color: ${props => !props.active && 'var(--grey7)'};

    i {
      color: ${props => !props.active && 'var(--grey2)'};
    }
  }
`;
