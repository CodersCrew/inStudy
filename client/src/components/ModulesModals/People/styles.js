import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-xl);
`;

export const AddItemButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-right: 4px;
  border: 1px dashed var(--grey4);
  padding: var(--space-md) 0;
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  color: var(--text3);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    background-color: var(--grey7);
    color: var(--text2);
  }
`;

export const ItemContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-rows: auto auto auto 24px;
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--grey7);
  box-shadow: var(--shadow3);
`;

export const Image = styled.div`
  grid-area: 1/1/2/2;
  background: url('${props => props.src}') no-repeat center/cover;
  width: 64px;
  height: 64px;
  border-radius: 4px;
`;

export const BasicData = styled.div`
  grid-area: 1/2/2/3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: var(--space-sm);
  font-family: var(--headerFont);
`;

export const Title = styled.div`
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;

export const Subtitle = styled.div`
  width: 100%;
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;

export const Description = styled.div`
  grid-area: 3/1/4/3;
  width: 100%;
  margin: var(--space-sm) 0;
  font-family: var(--headerFont);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--regular);
  color: var(--text3);
`;

export const Buttons = styled.div`
  grid-area: 4/1/5/3;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--grey3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  i {
    font-size: var(--font-xs);
    color: var(--grey3);
  }

  + div {
    margin-left: var(--space-sm);
  }

  &:hover {
    border: 1px solid ${props => (props.type === 'delete' ? 'var(--error)' : 'var(--primary2)')};

    i {
      color: ${props => (props.type === 'delete' ? 'var(--error)' : 'var(--primary2)')};
    }
  }
`;
