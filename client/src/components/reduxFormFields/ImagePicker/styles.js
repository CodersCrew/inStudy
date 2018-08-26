import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export const StyledDropzone = styled(Dropzone)`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  border: 1px solid var(--grey5);
  border-radius: 4px;
  background: url('${props => props.preview}') no-repeat center/cover;
  font-family: 'Font Awesome 5 Pro', sans-serif;
  font-size: var(--font-lg);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &::before {
    content: '\f044';
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
    color: ${props => (props.preview ? 'var(--white)' : 'var(--grey4)')};
    background-color: ${props => (props.preview ? 'rgba(0, 0, 0, 0.3)' : 'var(--white)')};
    transition: all 0.3s var(--ease-in-out);
  }

  &:hover::before {
    color: ${props => (props.preview ? 'var(--white)' : 'var(--grey3)')};
    background-color: ${props => (props.preview ? 'rgba(0, 0, 0, 0.75)' : 'var(--white)')};
  }
`;
