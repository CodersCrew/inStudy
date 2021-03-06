import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export const StyledDropzone = styled(Dropzone)`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  box-shadow: 0 0 0 1px var(--grey5);
  border-radius: 4px;
  background: url('${props => props.preview}') no-repeat center/contain;
  cursor: pointer;
  overflow: hidden;
`;

export const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: ${props => props.preview ? 'rgba(0, 0, 0, 0.3)' : 'var(--white)'};
  transition: all 0.3s var(--ease-in-out);

  i {
    font-size: var(--font-lg);
    color: ${props => (props.preview ? 'var(--white)' : 'var(--grey4)')};
    transition: all 0.3s var(--ease-in-out);
  }

  &:hover {
    background-color: ${props => (props.preview ? 'rgba(0, 0, 0, 0.75)' : 'var(--white)')};

    i {
      color: ${props => (props.preview ? 'var(--white)' : 'var(--grey3)')};
    }
  }
`;
