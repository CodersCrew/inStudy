import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { Modal } from 'CC-UI';
import { FormRenderer } from 'CC-UI/lib/services/forms';
import modulesConfig from '../../modulesConfig';
import baseFields from './formConfig';
import { Top, IconPicker, TitleInput } from './styles';

const ModalWrapper = props => (
  <FormRenderer
    name={`${props.id}-modal`}
    fields={{ ...baseFields, ...modulesConfig[props.id].fieldsConfig }}
  >
    {(Field, handleSubmit) => <ModalBase {...props} Field={Field} handleSubmit={handleSubmit} />}
  </FormRenderer>
);

ModalWrapper.propTypes = {
  id: string.isRequired,
};

class ModalBase extends Component {
  shouldComponentUpdate(np) {
    return !(!np.visible && !this.props.visible);
  }

  onSubmit = values => console.log(values);

  render() {
    const { visible, onClose, id, name, icon, Content, Field, handleSubmit } = this.props;

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
          <IconPicker>
            <Field name="icon" />
          </IconPicker>
          <TitleInput>
            <Field name="title" />
          </TitleInput>
        </Top>
        <Content Field={Field} />
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

export default ModalWrapper;
