import React, { Component } from 'react';
import { bool, func, string, node, object, number, array } from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Tooltip } from 'react-tippy';
import { omit, isInitiativeView } from 'utils';
import { required } from 'utils/validators';
import { Modal } from 'components';
import { Input, IconPicker } from 'components/reduxFormFields';
import { withNotifications, withCloseAnimation } from 'hocs';
import { addUserModule, updateUserModule, deleteUserModule } from 'store/actions/userModules';
import { addInitiativeModule, updateInitiativeModule, deleteInitiativeModule } from 'store/actions/initiativeModules';
import { addNotification, updateNotification, deleteNotification } from './notifications';
import { Top, InputWrapper, ContentHeader, DeleteConfirmationModal, ItemsError } from './styles';

const parseInitialValues = ({ title, icon, content }) => ({ title, icon, ...content });

const valueSelector = formValueSelector('moduleModal');

const typesWithItems = ['accordion', 'logos', 'numbers', 'people', 'projects', 'skills', 'timeline', 'traits'];

const mapStateToProps = state => ({
  items: valueSelector(state, 'items'),
  initiatives: state.auth.initiatives.reduce((acc, { _id, shortUrl }) => ({ ...acc, [shortUrl]: _id }), {}),
});

const haveItemsError = items => (!items || !items.length || Object.keys(items[0]).length < 2);

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

    this.state = {
      isModalOpen: false,
      isModuleHidden: props?.initialValues?.isHidden || false,
      itemsError: null,
    };
  }

  static getDerivedStateFromProps = (props, state) => (state.itemsError && !haveItemsError(props.items))
    ? { itemsError: null }
    : null;

  getInitiativeId = () => this.props.initiatives[window.location.pathname.split('/')[2]];

  onSubmit = async (values) => {
    if (typesWithItems.includes(this.props.type) && haveItemsError(this.props.items)) {
      this.setState({ itemsError: 'Musisz dodać co najmniej jeden element' });
      Promise.reject();
    } else {
      const valuesToSubmit = {
        icon: values.icon,
        title: values.title,
        type: this.props.type,
        isHidden: this.state.isModuleHidden,
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
    }
  };

  deleteModule = async () => {
    if (isInitiativeView()) {
      await this.props.deleteInitiativeModule(this.getInitiativeId(), this.props.id);
    } else {
      await this.props.deleteUserModule(this.props.moduleIndex);
    }
    this.props.notify(deleteNotification(this.props.initialValues));
  };

  toggleHide = () => this.setState(state => ({ isModuleHidden: !state.isModuleHidden }));

  openConfiramtionModal = () => this.setState({ isModalOpen: true });

  closeConfirmationModal = () => this.setState({ isModalOpen: false });

  render() {
    const { visible, onClose, name, iconClass, handleSubmit, children, submitting, contentHeader } = this.props;
    const { isModalOpen, isModuleHidden, itemsError } = this.state;
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
      {
        key: 'hide',
        onClick: this.toggleHide,
        label: (
          <Tooltip title={isModuleHidden ? 'Pokaż moduł' : 'Ukryj moduł'} size="small">
            <i className={`fal fa-eye${isModuleHidden ? '' : '-slash'}`} />
          </Tooltip>
        ),
        disabled: submitting,
        style: { marginRight: 'auto' },
      },
    ];

    if (this.isEditModal) {
      buttons.push({
        key: 'delete',
        onClick: this.openConfiramtionModal,
        label: (
          <Tooltip title="Usuń moduł" size="small">
            <i className="fal fa-trash-alt" />
          </Tooltip>
        ),
        type: 'danger',
        ghost: true,
        disabled: submitting,
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
        {itemsError && <ItemsError>{itemsError}</ItemsError>}
        {children}
        <DeleteConfirmationModal
          visible={isModalOpen}
          type="confirmation"
          onCancel={this.closeConfirmationModal}
          title="Czy jesteś pewien, że chcesz usunąć ten moduł?"
          iconClass="fal fa-trash-alt"
          buttons={[
            {
              onClick: this.deleteModule,
              label: 'Usuń moduł',
              type: 'danger',
              ghost: true,
              loading: submitting,
            },
            {
              onClick: this.closeConfirmationModal,
              label: 'Nie usuwaj',
              type: 'default',
              loading: submitting,
            },
          ]}
        >
          Usuwanie jest procesem nieodwracalnym. Jeśli sądzisz, że moduł może przydać się w przyszłości skorzystaj z opcji jego ukrycia.
        </DeleteConfirmationModal>
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
  items: array,
};

ModalBase.defaultProps = {
  contentHeader: '',
  submitting: false,
  initialValues: null,
  moduleIndex: null,
  id: '',
  items: null,
};

export default ModalBase;
