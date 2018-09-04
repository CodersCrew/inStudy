import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';

@withCloseAnimation
class RolesModal extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Modal
        title="Edytuj role w inicjatywie"
        type="complex"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        Roles Modal
      </Modal>
    );
  }
}

RolesModal.propTypes = {
  visible: bool,
  onCancel: func,
};

RolesModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default RolesModal;
