import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'components';
import { Top, StyledIconPicker, StyledInput } from './styles';
import { required } from 'utils/validators';

@reduxForm({ form: 'addModule' })
class ModalBase extends Component {
  shouldComponentUpdate(np) {
    return !(!np.visible && !this.props.visible);
  }

  onSubmit = values => console.log(values);

  render() {
    const { visible, onClose, id, name, icon, handleSubmit, children } = this.props;

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
          },
          {
            onClick: () => onClose(),
            label: 'Anuluj',
            kind: 'grey',
          },
        ]}
      >
        <Top>
          <Field
            name="icon"
            component={StyledIconPicker}
            props={{ label: 'Ikona' }}
            validate={[required]}
          />
          <Field
            name="title"
            component={StyledInput}
            props={{ label: 'Tytuł modułu' }}
            validate={[required]}
          />
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
};

export default ModalBase;
