import React, { PureComponent, Fragment } from 'react';
import { array, func, bool } from 'prop-types';
import EmptyState from './EmptyState';
import ModuleBase from './ModuleBase';

class Modules extends PureComponent {
  renderModule = (module, index) => (
    <ModuleBase key={`${module.title}-${module.icon}`} moduleIndex={index} {...module} editable={this.props.editable} />
  );

  render() {
    const { modules, openModal, editable } = this.props;

    return (
      <Fragment>
        {modules.map(this.renderModule)}
        {editable && <EmptyState modulesCount={modules.length} openModal={openModal} />}
      </Fragment>
    );
  }
}

Modules.propTypes = {
  modules: array,
  openModal: func.isRequired,
  editable: bool.isRequired,
};

Modules.defaultProps = {
  modules: [],
};

export default Modules;
