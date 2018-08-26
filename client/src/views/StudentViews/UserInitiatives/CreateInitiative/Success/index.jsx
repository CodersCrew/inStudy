import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'components';
import texts from './texts';

class Success extends PureComponent {
  render() {
    const { visible, closeModal } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={closeModal}
        title={texts.modalTitle}
        icon="/fa-icons/smile-beam-light.svg"
        type="confirmation"
        width={644}
        buttons={[
          {
            onClick: closeModal,
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

Success.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
};

Success.defaultProps = {
  visible: false,
};

export default Success;