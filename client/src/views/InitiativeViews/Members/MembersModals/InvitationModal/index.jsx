import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';

@withCloseAnimation
class InvitationModal extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Modal
        title="Zaproś nowe osoby do inicjatywy"
        type="complex"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        InvitationModal
      </Modal>
    );
  }
}

InvitationModal.propTypes = {
  visible: bool,
  onCancel: func,
};

InvitationModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default InvitationModal;
