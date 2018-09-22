import React, { PureComponent } from 'react';
import { string, object, number, bool } from 'prop-types';
import { pick } from 'utils';
import { modulesConfig } from 'data';
import { Container, Header, Icon, Text, Content, EditIcon } from './styles';

const staticProps = {
  icon: string,
  title: string.isRequired,
  type: string.isRequired,
};

class EditableModuleBase extends PureComponent {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const modalData = modulesConfig[this.props.type];
    const ModuleComponent = modalData.module;
    const ModuleModal = modalData.modalContent;

    return (
      <Container {...this.props}>
        <EditIcon className="fal fa-edit" onClick={this.openModal} />
        <Header>
          {this.props.icon && <Icon className={`fal fa-${this.props.icon}`} />}
          <Text>{this.props.title}</Text>
        </Header>
        <Content>
          <ModuleComponent {...this.props.content} />
        </Content>
        {this.state.isModalOpen && (
          <ModuleModal
            visible
            key={this.props._id}
            id={this.props._id}
            name={modalData.name}
            iconClass={modalData.iconClass}
            type={this.props.type}
            onClose={this.closeModal}
            initialValues={pick(this.props, ['title', 'icon', 'content', 'isHidden'])}
            moduleIndex={this.props.moduleIndex}
          />
        )}
      </Container>
    );
  }
}

EditableModuleBase.propTypes = { ...staticProps, moduleIndex: number.isRequired, id: string };
EditableModuleBase.defaultProps = { id: '' };

const StaticModuleBase = (props) => {
  const modalData = modulesConfig[props.type];
  const ModuleComponent = modalData.module;

  return (
    <Container>
      <Header>
        <Icon className={`fal fa-${props.icon}`} />
        <Text>{props.title}</Text>
      </Header>
      <Content>
        <ModuleComponent {...props.content} />
      </Content>
    </Container>
  );
};

StaticModuleBase.propTypes = staticProps;

const ModuleBase = props => (props.editable ? <EditableModuleBase {...props} /> : <StaticModuleBase {...props} />);

ModuleBase.propTypes = {
  ...staticProps,
  moduleIndex: number.isRequired,
  editable: bool.isRequired,
  content: object,
};

ModuleBase.defaultProps = {
  content: {},
};

export default ModuleBase;
