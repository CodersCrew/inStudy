import React, { PureComponent, Fragment } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { Table, Tag, Button } from 'antd';
import { withCloseAnimation } from 'hocs';
import { Input, TextArea, TagsSelect } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { Modal } from 'components';
import { TableWrapper, Actions, Action } from './styles';

const getRowKey = ({ _id }) => _id;

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
    remove();
    if (this.state.rowValuesSnapshot.name) {
      insert(this.state.rowValuesSnapshot);
    }
    this.setState({ editingRowIndex: null, rowValuesSnapshot: {} });
  };

  saveRoleEditing = () => this.setState({ editingRowIndex: null, rowValuesSnapshot: {} });

  renderName = (name, { index, rfName }) =>
    this.isEditing(index) ? <Field name={`${rfName}.name`} component={Input} validate={[required]} /> : name;

  renderDefaultDescription = (defaultDescription, { index, rfName }) =>
    this.isEditing(index) ? (
      <Field name={`${rfName}.defaultDescription`} component={TextArea} validate={[required]} />
    ) : (
      defaultDescription
    );

  renderDefaultTags = (defaultTags, { index, rfName }) =>
    this.isEditing(index) ? (
      <Field name={`${rfName}.defaultTags`} component={TagsSelect} validate={[required]} />
    ) : (
      defaultTags.map(tag => (
        <Tag color="blue" key={tag}>
          {tag}
        </Tag>
      ))
    );

  renderActions = (x, { index, remove, insert, error, name, defaultDescription, defaultTags, _id }) => {
    const isDisabled = (!this.isEditing(index) && this.state.editingRowIndex !== null) || error;
    const valuesSnapshot = { name, defaultDescription, defaultTags, _id };
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
            <Action isDisabled={isDisabled} onClick={() => this.startRoleEditing(index, valuesSnapshot)}>
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
    const tableData = [];
    const error =
      Array.isArray(this.props.errors?.roles) && this.props.errors.roles.find(role => role && Object.keys(role).length);

    fields.map((rfName, index) => {
      const enhanceField = {
        index,
        rfName,
        insert: value => fields.insert(index, value),
        error,
        remove: () => fields.remove(index),
      };
      tableData.push({ ...fields.get(index), ...enhanceField });
    });

    return (
      <TableWrapper>
        <Table columns={this.columns} dataSource={tableData} pagination={false} rowKey={getRowKey} />
        {!error &&
          !this.state.editingRowIndex && (
            <Button type="primary" onClick={() => this.addRole(fields.length, fields.push)}>
              Dodaj rolę
            </Button>
          )}
      </TableWrapper>
    );
  };

  render() {
    return (
      <Modal
        title="Edytuj role w inicjatywie"
        type="empty"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        width={960}
      >
        <FieldArray
          name="roles"
          component={this.renderRolesTable}
          props={{ editingRowsIds: this.state.editingRowsIds }}
        />
      </Modal>
    );
  }
}

RolesModal.propTypes = {
  visible: bool,
  onCancel: func,
};

RolesModal.defaultProps = {
  visible: false,
  onCancel: func,
};

export default RolesModal;
