import React, { PureComponent, Fragment } from 'react';
import { bool, func, oneOfType, array, object } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { Table, Tag } from 'antd';
import { withCloseAnimation } from 'hocs';
import { Input, TextArea, TagsSelect } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { Modal } from 'components';
import { TableWrapper, Actions, Action, StyledButton } from './styles';

const getRowKey = ({ _id }) => _id;

const renderTag = tag => (
  <Tag color="blue" key={tag}>
    {tag}
  </Tag>
);

@withCloseAnimation
@reduxForm({ form: 'rolesModalForm' })
@connect(state => ({
  errors: getFormSyncErrors('rolesModalForm')(state),
}))
class RolesModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editingRowIndex: null,
      rowValuesSnapshot: {},
    };

    this.columns = [
      {
        title: 'Nazwa roli',
        dataIndex: 'name',
        key: 'name',
        render: this.renderName,
        className: 'name',
        editable: true,
      },
      {
        title: 'Domyślny opis',
        dataIndex: 'defaultDescription',
        key: 'defaultDescription',
        render: this.renderDefaultDescription,
        className: 'defaultDescription',
        editable: true,
      },
      {
        title: 'Domyślne tagi',
        dataIndex: 'defaultTags',
        key: 'defaultTags',
        render: this.renderDefaultTags,
        className: 'defaultTags',
        editable: true,
      },
      {
        title: 'Akcje',
        dataIndex: 'actions',
        key: 'actions',
        editable: true,
        render: this.renderActions,
        className: 'actions',
      },
    ];

    props.initialize({ roles: props.roles });
  }

  isEditing = index => this.state.editingRowIndex === index;

  addRole = (index, push) => {
    push({ name: '', defaultDescription: '', defaultTags: [], _id: `new-${Math.random()}` });
    this.startRoleEditing(index, { name: '', defaultDescription: '', defaultTags: [] });
  };

  startRoleEditing = (editingRowIndex, rowValuesSnapshot) => this.setState({ editingRowIndex, rowValuesSnapshot });

  cancelRoleEditing = (insert, remove) => {
    const { rowValuesSnapshot } = this.state;

    remove();
    if (rowValuesSnapshot.name) {
      insert(rowValuesSnapshot);
    }

    this.setState({ editingRowIndex: null, rowValuesSnapshot: {} });
  };

  saveRoleEditing = () => this.setState({ editingRowIndex: null, rowValuesSnapshot: {} });

  renderField = (name, component) => <Field name={name} component={component} validate={[required]} />;

  renderName = (name, { index, rfName }) => (this.isEditing(index) ? this.renderField(`${rfName}.name`, Input) : name);

  renderDefaultDescription = (defaultDescription, { index, rfName }) => this.isEditing(index)
    ? this.renderField(`${rfName}.defaultDescription`, TextArea)
    : defaultDescription;

  renderDefaultTags = (defaultTags, { index, rfName }) => this.isEditing(index)
    ? this.renderField(`${rfName}.defaultTags`, TagsSelect)
    : defaultTags.map(renderTag);

  renderActions = (x, {
    index, remove, insert, error, name, defaultDescription, defaultTags, _id,
  }) => {
    const isDisabled = (!this.isEditing(index) && this.state.editingRowIndex !== null) || error;
    const valuesSnapshot = {
      name, defaultDescription, defaultTags, _id,
    };
    return (
      <Actions>
        {this.isEditing(index) ? (
          <Fragment>
            <Action isDisabled={isDisabled} onClick={() => this.saveRoleEditing(index)}>
              Zapisz
            </Action>
            <Action onClick={() => this.cancelRoleEditing(insert, remove)}>Anuluj</Action>
          </Fragment>
        ) : (
          <Fragment>
            <Action
              isDisabled={isDisabled}
              onClick={() => this.startRoleEditing(index, valuesSnapshot)}
            >
              Edytuj
            </Action>
            <Action isDisabled={isDisabled} onClick={remove}>
              Usuń
            </Action>
          </Fragment>
        )}
      </Actions>
    );
  };

  renderRolesTable = ({ fields }) => {
    const { props: { errors }, state: { editingRowIndex } } = this;
    const error = Array.isArray(errors?.roles) && errors.roles.find(role => role && Object.keys(role).length);

    const tableData = fields.map((rfName, index) => {
      const enhanceField = {
        index,
        rfName,
        insert: value => fields.insert(index, value),
        error,
        remove: () => fields.remove(index),
      };
      return { ...fields.get(index), ...enhanceField };
    });

    return (
      <TableWrapper>
        <Table columns={this.columns} dataSource={tableData} pagination={false} rowKey={getRowKey} />
        {(!error && editingRowIndex === null) && (
          <StyledButton type="primary" onClick={() => this.addRole(fields.length, fields.push)}>
            Dodaj rolę
          </StyledButton>
        )}
      </TableWrapper>
    );
  };

  render() {
    const { props: { visible, onCancel }, state: { editingRowIndex } } = this;

    return (
      <Modal
        title="Edytuj role w inicjatywie"
        type="empty"
        visible={visible}
        onCancel={onCancel}
        width={960}
      >
        <FieldArray
          name="roles"
          component={this.renderRolesTable}
          props={{ editingRowIndex }}
        />
      </Modal>
    );
  }
}

RolesModal.propTypes = {
  roles: array,
  errors: oneOfType([array, object]),
  initialize: func,
  visible: bool,
  onCancel: func,
};

RolesModal.defaultProps = {
  roles: [],
  errors: {},
  initialize: () => {},
  visible: false,
  onCancel: () => {},
};

export default RolesModal;
