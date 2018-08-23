import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'CC-UI';
import texts from './texts';

class CreationType extends PureComponent {
  render() {
    const { visible, closeModal, incrementStep } = this.props;
    return (
      <Modal
        visible={visible}
        onClose={closeModal}
        title={texts.modalTitle}
        icon="/fa-icons/file-import-light.svg"
        type="confirmation"
        width={644}
        buttons={[
          {
            label: texts.importButtonLabel,
            size: 'lg',
            kind: 'grey',
            ghost: true,
          },
          {
            onClick: () => incrementStep(1),
            label: texts.createButtonLabel,
            size: 'lg',
            kind: 'grey',
            ghost: true,
          },
        ]}
      >
        {texts.modalContent}
      </Modal>
    );
  }
}

CreationType.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

CreationType.defaultProps = {
  visible: false,
};

export default CreationType;
