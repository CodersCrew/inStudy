import React, { Fragment } from 'react';
import { string, object, func } from 'prop-types';
import RolesModal from './RolesModal';
import InvitationModal from './InvitationModal';
import MailingModal from './MailingModal';
import MemberEditModal from './MemberEditModal';

const MembersModals = ({ openedModal, modalData, closeModal }) => (
  <Fragment>
    <RolesModal key="roles" visible={openedModal === 'roles'} onCancel={closeModal} {...modalData} />
    <InvitationModal key="invitation" visible={openedModal === 'invitation'} onCancel={closeModal} {...modalData} />
    <MailingModal key="mailing" visible={openedModal === 'mailing'} onCancel={closeModal} {...modalData} />
    <MemberEditModal key="member" visible={openedModal === 'member'} onCancel={closeModal} {...modalData} />
  </Fragment>
);

MembersModals.propTypes = {
  openedModal: string,
  modalData: object,
  closeModal: func.isRequired,
};

MembersModals.defaultProps = {
  openedModal: '',
  modalData: {},
};

export default MembersModals;
