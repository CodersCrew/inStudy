import React, { PureComponent } from 'react';
import { string, object, number } from 'prop-types';
import { pick } from 'utils';
import modulesConfig from '../../modulesConfig';
import { Container, Header, Icon, Text, Content, EditIcon } from './styles';

class ModuleBase extends PureComponent {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const modalData = modulesConfig[this.props.type];
    const ModuleComponent = modalData.module;
    const ModuleModal = modalData.modalContent;
    console.log(this.state.isModalOpen);

    return (
      <Container>
        <EditIcon className="fal fa-edit" onClick={this.openModal} />
        <Header>
          <Icon className={`fal fa-${this.props.icon}`} />
          <Text>{this.props.title}</Text>
        </Header>
        <Content>
          <ModuleComponent {...this.props.content} />
        </Content>
        {this.state.isModalOpen && (
          <ModuleModal
            visible
            key={this.props.type}
            name={modalData.name}
            icon={modalData.icon}
            type={this.props.type}
            onClose={this.closeModal}
            initialValues={pick(this.props, ['title', 'icon', 'content'])}
            moduleIndex={this.props.moduleIndex}
          />
        )}
      </Container>
    );
  }
}

ModuleBase.propTypes = {
  content: object.isRequired,
  icon: string.isRequired,
  title: string.isRequired,
  type: string.isRequired,
  moduleIndex: number.isRequired,
};

export default ModuleBase;
