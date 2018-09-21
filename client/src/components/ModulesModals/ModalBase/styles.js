import styled from 'styled-components';
import { Modal } from 'components';

export const Top = styled.div`
  display: grid;
  grid-gap: 0 var(--space-xl);
  grid-template-columns: 160px 1fr;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const ItemsError = styled.div`
  padding-bottom: var(--space-md);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--regular);
  color: var(--error);
`;

export const ContentHeader = styled.h6`
  margin-bottom: var(--space-sm);
  font-family: var(--headerFont);
  font-size: var(--font-xs);
  line-height: var(--font-xs-lh);
  font-weight: var(--bold);
  text-transform: uppercase;
  color: var(--text3);
`;

export const DeleteConfirmationModal = styled(Modal)`
  i {
    color: var(--error);
  }
`;

export const HideConfirmationModal = styled(Modal)`
  i {
    color: var(--grey3);
  }
`;
