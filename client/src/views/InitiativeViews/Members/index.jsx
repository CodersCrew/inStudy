import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { Table, Button } from 'antd';
import { members } from './data';
import { MainContainer, Image, Name } from './styles';

const getRowKey = ({ _id }) => _id;

class Members extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
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
          render: this.renderRole,
          className: 'role',
        },
        {
          title: 'Poziom kontroli',
          dataIndex: 'permisions',
          render: this.renderPermisions,
          className: 'permisions',
        },
        {
          title: 'Edycja',
          dataIndex: '_id',
          render: this.renderDatailsIcon,
          align: 'center',
          className: 'editButton',
        },
      ],
    };
  }

  openEditModal = (e, userId) => {
    e.stopPropagation();
    const userObj = members.find(({ _id }) => _id === userId);
    console.log(userObj);
  };

  renderImage = image => <Image src={image} />;

  renderName = (x, { firstName, lastName }) => <Name>{`${firstName} ${lastName}`}</Name>;

  renderRole = role => role;

  renderPermisions = permisions => permisions;

  renderDatailsIcon = userId => <Button onClick={e => this.openEditModal(e, userId)}>Edytuj</Button>;

  renderDetails = ({ roleDescription }) => <p>{roleDescription}</p>;

  render() {
    return (
      <MainContainer>
        <Table
          expandRowByClick
          rowKey={getRowKey}
          columns={this.state.columns}
          dataSource={members}
          expandedRowRender={this.renderDetails}
        />
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
