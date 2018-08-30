import React, { PureComponent, Fragment } from 'react';
import { array, func } from 'prop-types';
import EmptyState from './EmptyState';
import ModuleBase from './ModuleBase';

const renderModule = (module, index) => {
  return <ModuleBase key={`${module.title}-${module.icon}`} moduleIndex={index} {...module} />;
};

class Modules extends PureComponent {
  render() {
    const { modules, openModal } = this.props;

    return (
      <Fragment>
        {modules.map(renderModule)}
        <EmptyState modulesCount={modules.length} openModal={openModal} />
      </Fragment>
    );
  }
}

Modules.propTypes = {
  modules: array,
  openModal: func.isRequired,
};

Modules.defaultProps = {
  modules: [],
};

export default Modules;
