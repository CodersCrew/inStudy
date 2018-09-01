import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { ConfirmationModal } from 'components';
import texts from './texts';

class CreationType extends PureComponent {
  render() {
    const { visible, closeModal, incrementStep } = this.props;
    return (
      <ConfirmationModal
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
      </ConfirmationModal>
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
