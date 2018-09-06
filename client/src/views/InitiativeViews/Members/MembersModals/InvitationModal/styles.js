import styled from 'styled-components';

export const EmailsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-md);
  align-items: start;

  &:last-of-type {
    .ant-form-item {
      margin-bottom: 0;
    }

    .ant-input-group-addon {
      display: none;
    }

    .ant-input {
      border-radius: 4px !important;
    }
  }

  .ant-input-group-addon {
    cursor: pointer;

    &:hover i {
      color: var(--error);
    }
  }
`;
