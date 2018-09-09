import React, { Component } from 'react';
import { bool, func, string, node, object, number, array } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { omit } from 'utils';
import { required } from 'utils/validators';
import { Modal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { withNotifications, withCloseAnimation } from 'hocs';
import { addUserModule, updateUserModule, deleteUserModule } from 'store/actions/userModules';
import { addInitiativeModule, updateInitiativeModule, deleteInitiativeModule } from 'store/actions/initiativeModules';
import { addNotification, updateNotification, deleteNotification } from './notifications';
import { Top, InputWrapper, ContentHeader } from './styles';

const parseInitialValues = ({ title, icon, content }) => ({ title, icon, ...content });

const isInitiativeView = () => window.location.pathname.includes('inicjatywy');

const mapStateToProps = ({ auth }) => ({
  initiatives: auth.initiatives.reduce((acc, { _id, shortUrl }) => ({ ...acc, [shortUrl]: _id }), {}),
});

const actions = {
  addUserModule,
  updateUserModule,
  deleteUserModule,
  addInitiativeModule,
  updateInitiativeModule,
  deleteInitiativeModule,
};

const withHocs = compose(
  withCloseAnimation,
  withNotifications,
  reduxForm({ form: 'moduleModal' }),
  connect(
    mapStateToProps,
    actions,
  ),
);

@withHocs
class ModalBase extends Component {
  constructor(props) {
    super(props);
    this.isEditModal = false;

    if (props.initialValues) {
      this.isEditModal = true;
      props.initialize(parseInitialValues(props.initialValues));
    }
  }

  getInitiativeId = () => this.props.initiatives[window.location.pathname.split('/')[2]];

  onSubmit = async (values) => {
    const valuesToSubmit = {
      icon: values.icon,
      title: values.title,
      type: this.props.type,
      content: omit(values, ['icon', 'title']),
    };

    if (this.isEditModal) {
      if (isInitiativeView()) {
        await this.props.updateInitiativeModule(valuesToSubmit, this.getInitiativeId(), this.props.id);
      } else {
        await this.props.updateUserModule(valuesToSubmit, this.props.moduleIndex);
      }
      this.props.notify(updateNotification(values));
    } else {
      if (isInitiativeView()) {
        await this.props.addInitiativeModule(this.getInitiativeId(), valuesToSubmit);
      } else {
        await this.props.addUserModule(valuesToSubmit);
      }
      this.props.notify(addNotification(values));
    }
    this.props.onClose();
  };

  deleteModule = async () => {
    if (isInitiativeView()) {
      await this.props.deleteInitiativeModule(this.getInitiativeId(), this.props.id);
    } else {
      await this.props.deleteUserModule(this.props.moduleIndex);
    }
    this.props.notify(deleteNotification(this.props.initialValues));
  };

  render() {
    const { visible, onClose, name, iconClass, handleSubmit, children, submitting, contentHeader } = this.props;
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
      <Modal
        type="complex"
        visible={visible}
        onCancel={submitting ? () => {} : onClose}
        title={`${this.isEditModal ? 'Edytuj' : 'Dodaj'} moduł "${name}"`}
        iconClass={iconClass}
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
  iconClass: string.isRequired,
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
  addInitiativeModule: func,
  notify: func,
  updateInitiativeModule: func,
  deleteInitiativeModule: func,
  id: string,
  initiatives: array,
};

ModalBase.defaultProps = {
  contentHeader: '',
  submitting: false,
  initialValues: null,
  moduleIndex: null,
  id: '',
};

export default ModalBase;
