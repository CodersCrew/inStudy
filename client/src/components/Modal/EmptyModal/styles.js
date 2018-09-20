import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }

  .ant-modal-body {
    padding: 0;
    border-radius: 4px;
  }

  .ant-modal-footer {
    display: none;
  }
`;
