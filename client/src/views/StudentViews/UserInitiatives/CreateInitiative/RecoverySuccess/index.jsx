import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'components';

const Text = styled.p`
  padding: var(--space-sm) 0 var(--space-md);
  font-family: var(--mainFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--text1);
`;

const Initial = ({ visible, closeModal }) => (
  <Modal
    type="confirmation"
    visible={visible}
    onCancel={closeModal}
    title="Dostałeś od nas maila"
    iconClass="fal fa-smile-beam"
    width={644}
    buttons={[
      {
        onClick: closeModal,
        label: 'Ok, już wchodzę na maila',
        size: 'large',
        type: 'primary',
      },
    ]}
  >
    <Text>
      Na podany adres e-mail wysłaliśmy właśnie link, który pozwoli Ci uzyskać dostęp do zaimportowanego konta inicjatywy.
    </Text>
  </Modal>
);

Initial.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
};

Initial.defaultProps = {
  visible: false,
};

export default Initial;
