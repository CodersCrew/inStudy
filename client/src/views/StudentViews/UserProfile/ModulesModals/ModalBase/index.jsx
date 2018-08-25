import React, { Component } from 'react';
import { bool, func, string, node } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { Top, InputWrapper } from './styles';
import { required } from 'utils/validators';

const addModuleRequest = moduleData =>
  new Promise(resolve => {
    setTimeout(() => resolve(moduleData), 3000);
  });

@reduxForm({ form: 'addModule' })
class ModalBase extends Component {
  shouldComponentUpdate(np) {
    return !(!np.visible && !this.props.visible);
  }

  onSubmit = async values => {
    console.log(values);
    await addModuleRequest(values);
    console.log('Module added!');
    this.props.onClose();
  };

  render() {
    const { visible, onClose, name, icon, handleSubmit, children, submitting } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={submitting ? () => {} : onClose}
        title={`Dodaj moduł "${name}"`}
        icon={`/fa-icons/${icon}-light.svg`}
        type="complex"
        width={644}
        buttons={[
          {
            onClick: handleSubmit(this.onSubmit),
            label: 'Dodaj',
            type: 'primary',
            loading: submitting,
          },
          {
            onClick: () => onClose(),
            label: 'Anuluj',
            disabled: submitting,
          },
        ]}
      >
        <Top>
          <Field
            name="icon"
            component={IconPicker}
            props={{ label: 'Ikona', disabled: submitting }}
            validate={[required]}
          />
          <InputWrapper>
            <Field
              name="title"
              component={Input}
              props={{ label: 'Tytuł modułu', disabled: submitting }}
              validate={[required]}
            />
          </InputWrapper>
        </Top>
        {children}
      </Modal>
    );
  }
}

ModalBase.propTypes = {
  handleSubmit: func,
  name: string.isRequired,
  icon: string.isRequired,
  visible: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
  submitting: bool,
};

ModalBase.defaultProps = {
  submitting: false,
};

export default ModalBase;
