import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding-top: var(--space-lg);
    padding-bottom: 0;
    border-bottom: 0;
  }

  .ant-modal-body {
    padding-top: 0;
    padding-bottom: 0;
    text-align: center;
  }

  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
    border-top: none;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Icon = styled.i`
  font-size: 48px;
  text-align: center;
  color: var(--primary2);
`;

export const TitleText = styled.h2`
  padding: var(--space-md) 0 var(--space-sm);
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
  text-align: center;
`;
