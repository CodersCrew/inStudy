import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';

@withCloseAnimation
class MailingModal extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Modal
        title="Wyślij grupowy mailing"
        type="complex"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        MailingModel
      </Modal>
    );
  }
}

MailingModal.propTypes = {
  visible: bool,
  onCancel: func,
};

MailingModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default MailingModal;
