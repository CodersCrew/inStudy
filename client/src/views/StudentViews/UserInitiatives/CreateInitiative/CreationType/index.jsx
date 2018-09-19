import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'components';
import styled from 'styled-components';
import { media } from 'utils';
import texts from './texts';

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    ${media.xs`
      flex-direction: column;

      button {
        width: 200px;
      }

      button + button {
        margin: var(--space-md) 0 0 0;
      }
    `}
  }
`;

const CreationType = ({ visible, closeModal, incrementStep }) => (
  <StyledModal
    type="confirmation"
    visible={visible}
    onCancel={closeModal}
    title={texts.modalTitle}
    iconClass="fal fa-file-import"
    width={644}
    buttons={[
      {
        label: texts.importButtonLabel,
        size: 'large',
      },
      {
        onClick: () => incrementStep(1),
        label: texts.createButtonLabel,
        size: 'large',
      },
    ]}
  >
    {texts.modalContent}
  </StyledModal>
);

CreationType.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

CreationType.defaultProps = {
  visible: false,
};

export default CreationType;
