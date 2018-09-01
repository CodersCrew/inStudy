import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { ConfirmationModal } from 'components';
import texts from './texts';

class Success extends PureComponent {
  render() {
    const { visible, closeModal } = this.props;

    return (
      <ConfirmationModal
        visible={visible}
        onClose={closeModal}
        title={texts.modalTitle}
        iconClass="fal fa-smile-beam"
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
      </ConfirmationModal>
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
