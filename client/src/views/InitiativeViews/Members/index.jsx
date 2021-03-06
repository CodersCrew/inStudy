import React, { PureComponent, Fragment } from 'react';
import { string } from 'prop-types';
import { Table, Button, Tag } from 'antd';
import { Fab } from 'components';
import { members, roles } from './data';
import MembersModals from './MembersModals';
import { MainContainer, Image, Name, Tags } from './styles';

const getRowKey = ({ _id }) => _id;

class Members extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openedModal: '',
      modalData: null,
    };

    this.columns = [
      {
        title: 'Zdjęcie',
        dataIndex: 'image',
        render: this.renderImage,
        className: 'image',
      },
      {
        title: 'Imię i nazwisko',
        dataIndex: 'name',
        key: 'name',
        render: this.renderName,
        className: 'name',
      },
      {
        title: 'Rola w inicjatywie',
        dataIndex: 'role',
        key: 'role',
        render: role => role,
        className: 'role',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        render: email => email,
        className: 'email',
      },
      {
        title: 'Poziom kontroli',
        dataIndex: 'permisions',
        render: permisions => permisions,
        className: 'permisions',
      },
      {
        title: 'Edycja',
        dataIndex: '_id',
        render: this.renderEditButton,
        align: 'center',
        className: 'editButton',
      },
    ];
  }

  openRolesModal = () => this.setState({ openedModal: 'roles', modalData: { roles } });

  openInvitationModal = () => this.setState({ openedModal: 'invitation' });

  openMailingModal = () => this.setState({ openedModal: 'mailing' });

  closeModal = () => this.setState({ openedModal: '', modalData: null });

  openEditModal = (e, userId) => {
    e.stopPropagation();
    const userObj = members.find(({ _id }) => _id === userId);
    this.setState({ openedModal: 'member', modalData: userObj });
  };

  renderImage = image => <Image src={image} />;

  renderName = (x, { firstName, lastName }) => <Name>{`${firstName} ${lastName}`}</Name>;

  renderEditButton = userId => <Button onClick={e => this.openEditModal(e, userId)}>Edytuj</Button>;

  renderDetails = ({ roleDescription, tags }) => (
    <Fragment>
      <div>{roleDescription}</div>
      {this.renderTags(tags)}
    </Fragment>
  );

  renderTags = tags => (
    <Tags>
      {tags.map(tag => (
        <Tag key={tag} color="blue">
          {tag}
        </Tag>
      ))}
    </Tags>
  );

  render() {
    const { openedModal, modalData } = this.state;

    return (
      <MainContainer>
        <Table
          expandRowByClick
          rowKey={getRowKey}
          columns={this.columns}
          dataSource={members}
          expandedRowRender={this.renderDetails}
        />
        <Fab
          title="Konfiguracja członków"
          iconClass="fal fa-ellipsis-v"
          iconOpenClass="fal fa-times"
          items={[
            {
              onClick: this.openRolesModal,
              title: 'Ustawienia ról',
              iconClass: 'fal fa-users-crown',
            },
            {
              onClick: this.openInvitationModal,
              title: 'Zaproś do inicjatywy',
              iconClass: 'fal fa-user-plus',
            },
            {
              onClick: this.openMailingModal,
              title: 'Wyślij grupowego maila',
              iconClass: 'fal fa-mail-bulk',
            },
          ]}
        />
        <MembersModals openedModal={openedModal} modalData={modalData} closeModal={this.closeModal} />
      </MainContainer>
    );
  }
}

Members.propTypes = {
  text: string,
};

Members.defaultProps = {
  text: 'Hello World',
};

export default Members;
