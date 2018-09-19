import React from 'react';
import { bool, func } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { Modal } from 'components';
import { Input } from 'components/reduxFormFields';
import { isEmail, required } from 'utils/validators';

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    padding-top: var(--space-sm);
  }
`;

const Text = styled.p`
  padding: var(--space-sm) 0 var(--space-md);
  font-family: var(--mainFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--regular);
  color: var(--text1);
`;

const Initial = ({ visible, closeModal, incrementStep }) => (
  <StyledModal
    type="confirmation"
    visible={visible}
    onCancel={closeModal}
    title="Zaimportuj konto z poprzedniej wersji portalu"
    iconClass="fal fa-file-import"
    width={644}
    buttons={[
      {
        onClick: () => incrementStep(1),
        label: 'Importuj konto',
        size: 'large',
        type: 'primary',
      },
    ]}
  >
    <Text>
      Aby zaimportować konto, podaj adres e-mail, którego uywałeś do logowania się w poprzedniej wersji inStudy
    </Text>
    <Field name="email" component={Input} props={{ placeholder: 'E-mail', size: 'large' }} validate={[isEmail, required]} />
  </StyledModal>
);

Initial.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

Initial.defaultProps = {
  visible: false,
};

export default reduxForm({ form: 'recovery' })(Initial);
