import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';

@withCloseAnimation
class MemberEditModal extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Modal
        type="empty"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        MemberEditModal
      </Modal>
    );
  }
}

MemberEditModal.propTypes = {
  visible: bool,
  onCancel: func,
};

MemberEditModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default MemberEditModal;
