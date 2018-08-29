import React, { Component } from 'react';
import { bool, func, string, node, object, number } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { omit } from 'utils';
import { Modal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { Top, InputWrapper, ContentHeader } from './styles';
import { required } from 'utils/validators';
import axios from 'axios';

const addModuleRequest = moduleData => axios.post('/api/user/module', moduleData);

const editModuleRequest = (moduleData, moduleIndex) =>
  axios.put('/api/user/module', { data: moduleData, index: moduleIndex });

const deleteModuleRequest = moduleIndex => axios.delete(`/api/user/module/${moduleIndex}`);

@reduxForm({ form: 'addModule' })
class ModalBase extends Component {
  constructor(props) {
    super(props);
    this.isEditModal = false;

    if (props.initialValues) {
      const valuesToInitialize = {
        title: props.initialValues.title,
        icon: props.initialValues.icon,
        ...props.initialValues.content,
      };
      this.isEditModal = true;
      props.initialize(valuesToInitialize);
    }
  }

  shouldComponentUpdate(np) {
    return !(!np.visible && !this.props.visible);
  }

  onSubmit = async values => {
    const valuesToSubmit = {
      icon: values.icon,
      title: values.title,
      type: this.props.type,
      content: omit(values, ['icon', 'title']),
    };
    console.log(valuesToSubmit);
    if (this.isEditModal) {
      await editModuleRequest(valuesToSubmit, this.props.moduleIndex);
      console.log('Module edited!');
    } else {
      await addModuleRequest(valuesToSubmit);
      console.log('Module added!');
    }
    this.props.onClose();
  };

  deleteModule = async () => {
    await deleteModuleRequest(this.props.moduleIndex);
    console.log('Module deleted');
  };

  render() {
    const { visible, onClose, name, icon, handleSubmit, children, submitting, contentHeader } = this.props;
    const buttons = [
      {
        onClick: handleSubmit(this.onSubmit),
        label: this.isEditModal ? 'Zapisz zmiany' : 'Dodaj moduł',
        type: 'primary',
        loading: submitting,
      },
      {
        onClick: () => onClose(),
        label: 'Anuluj',
        disabled: submitting,
      },
    ];

    if (this.isEditModal) {
      buttons.push({
        onClick: this.deleteModule,
        label: 'Usuń moduł',
        type: 'danger',
        ghost: true,
        disabled: submitting,
        style: { marginRight: 'auto' },
      });
    }

    console.log(buttons);

    return (
      <Modal
        visible={visible}
        onClose={submitting ? () => {} : onClose}
        title={`${this.isEditModal ? 'Edytuj' : 'Dodaj'} moduł "${name}"`}
        icon={`/fa-icons/${icon}-light.svg`}
        type="complex"
        width={644}
        buttons={buttons}
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
        {contentHeader && <ContentHeader>{contentHeader}</ContentHeader>}
        {children}
      </Modal>
    );
  }
}

ModalBase.propTypes = {
  contentHeader: string,
  handleSubmit: func,
  name: string.isRequired,
  icon: string.isRequired,
  visible: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
  submitting: bool,
  type: string.isRequired,
  initialValues: object,
  initialize: func.isRequired,
  moduleIndex: number,
};

ModalBase.defaultProps = {
  contentHeader: '',
  submitting: false,
  initialValues: null,
  moduleIndex: null,
};

export default ModalBase;
