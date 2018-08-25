import styled from 'styled-components';

export default styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: ${props => (props.fluid ? '100%;' : 'var(--container-width)')};
`;
