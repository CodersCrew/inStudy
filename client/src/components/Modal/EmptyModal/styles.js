import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }

  .ant-modal-body {
    padding: var(--space-lg);
  }

  .ant-modal-footer {
    display: none;
  }
`;
