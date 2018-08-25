import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    margin: var(--space-xs) 0;
    padding-left: ${props => (props.hasValue ? '40px' : '11px')};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 32px;
  padding: 0 11px;
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
  margin-top: var(--space-md);

  @media (max-height: 620px) {
    height: 240px;
  }

  > div > div:first-child {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: var(--space-sm);
    justify-items: center;
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
