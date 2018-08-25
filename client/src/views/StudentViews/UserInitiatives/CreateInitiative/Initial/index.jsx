import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'components';
import texts from './texts';

class Initial extends PureComponent {
  render() {
    const { visible, closeModal, incrementStep } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={closeModal}
        title={texts.modalTitle}
        icon="/fa-icons/smile-plus-light.svg"
        type="confirmation"
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
  }
}

Initial.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

Initial.defaultProps = {
  visible: false,
};

export default Initial;
