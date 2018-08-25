import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
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
  margin-bottom: var(--space-md);
  padding: var(--space-md);
  border-radius: 4px;
  background-color: var(--grey7);
  box-shadow: var(--shadow3);
`;

export const Dates = styled.div`
  width: calc(100% - 72px);
  font-family: var(--headerFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--medium);
  color: var(--primary2);
`;

export const Title = styled.div`
  width: calc(100% - 72px);
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;

export const Subtitle = styled.div`
  width: 100%;
  font-family: var(--headerFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;

export const Description = styled.div`
  width: 100%;
  font-family: var(--headerFont);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--regular);
  color: var(--text3);
`;

export const Buttons = styled.div`
  position: absolute;
  right: var(--space-md);
  top: var(--space-md);
  display: flex;
  justify-content: space-between;
  width: 56px;
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

  &:hover {
    border: 1px solid ${props => (props.type === 'delete' ? 'var(--error)' : 'var(--primary2)')};

    i {
      color: ${props => (props.type === 'delete' ? 'var(--error)' : 'var(--primary2)')};
    }
  }
`;
