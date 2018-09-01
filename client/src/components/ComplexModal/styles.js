import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Icon = styled.i`
  width: 40px;
  height: 24px;
  padding-right: var(--space-md);
  font-size: 20px;
  line-height: var(--font-md-lh);
  color: var(--primary2);
`;

export const TitleText = styled.h2`
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;
