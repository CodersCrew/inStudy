import React, { Component } from 'react';
import { bool, func, string, node } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { Top, InputWrapper } from './styles';
import { required } from 'utils/validators';

@reduxForm({ form: 'addModule' })
class ModalBase extends Component {
  shouldComponentUpdate(np) {
    return !(!np.visible && !this.props.visible);
  }

  onSubmit = values => console.log(values);

  render() {
    const { visible, onClose, name, icon, handleSubmit, children } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={onClose}
        title={`Dodaj moduł "${name}"`}
        icon={`/fa-icons/${icon}-light.svg`}
        type="complex"
        width={644}
        buttons={[
          {
            onClick: handleSubmit(this.onSubmit),
            label: 'Dodaj',
            type: 'primary',
          },
          {
            onClick: () => onClose(),
            label: 'Anuluj',
          },
        ]}
      >
        <Top>
          <Field
            name="icon"
            component={IconPicker}
            props={{ label: 'Ikona' }}
            validate={[required]}
          />
          <InputWrapper>
            <Field
              name="title"
              component={Input}
              props={{ label: 'Tytuł modułu' }}
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
  Field: func,
  Content: func,
  handleSubmit: func,
  name: string.isRequired,
  id: string.isRequired,
  icon: string.isRequired,
  visible: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
};

export default ModalBase;
