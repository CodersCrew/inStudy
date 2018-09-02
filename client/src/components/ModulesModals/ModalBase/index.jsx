import React, { Component } from 'react';
import { bool, func, string, node, object, number } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { omit } from 'utils';
import { required } from 'utils/validators';
import { ComplexModal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { withNotifications } from 'hocs';
import { addUserModule, updateUserModule, deleteUserModule } from 'store/actions/userModules';
import { addNotification, updateNotification, deleteNotification } from './notifications';
import { Top, InputWrapper, ContentHeader } from './styles';

const parseInitialValues = ({ title, icon, content }) => ({ title, icon, ...content });

@withNotifications
@reduxForm({ form: 'userModuleModal' })
@connect(
  null,
  { addUserModule, updateUserModule, deleteUserModule },
)
class ModalBase extends Component {
  constructor(props) {
    super(props);
    this.isEditModal = false;

    if (props.initialValues) {
      this.isEditModal = true;
      props.initialize(parseInitialValues(props.initialValues));
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
      await this.props.updateUserModule(valuesToSubmit, this.props.moduleIndex);
      this.props.notify(updateNotification(values));
    } else {
      await this.props.addUserModule(valuesToSubmit);
      this.props.notify(addNotification(values));
    }
    this.props.onClose();
  };

  deleteModule = async () => {
    await this.props.deleteUserModule(this.props.moduleIndex);
    this.props.notify(deleteNotification(this.props.initialValues));
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

    return (
      <ComplexModal
        visible={visible}
        onCancel={submitting ? () => {} : onClose}
        title={`${this.isEditModal ? 'Edytuj' : 'Dodaj'} moduł "${name}"`}
        iconClass="fal fa-phone"
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
      </ComplexModal>
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
  initialize: func,
  moduleIndex: number,
  deleteUserModule: func,
  updateUserModule: func,
  addUserModule: func,
  notify: func,
};

ModalBase.defaultProps = {
  contentHeader: '',
  submitting: false,
  initialValues: null,
  moduleIndex: null,
};

export default ModalBase;
