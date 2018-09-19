import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'components';
import texts from './texts';

const Initial = ({ visible, closeModal, incrementStep }) => (
  <Modal
    type="confirmation"
    visible={visible}
    onCancel={closeModal}
    title={texts.modalTitle}
    iconClass="fal fa-smile-plus"
    width={644}
    buttons={[
      {
        onClick: () => incrementStep(1),
        label: texts.buttonLabel,
        size: 'large',
      },
    ]}
  >
    {texts.modalContent}
  </Modal>
);

Initial.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

Initial.defaultProps = {
  visible: false,
};

export default Initial;
