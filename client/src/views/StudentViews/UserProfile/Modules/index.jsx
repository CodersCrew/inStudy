import React, { PureComponent } from 'react';
import { array, func } from 'prop-types';
import EmptyState from './EmptyState';

const renderModule = module => {
  console.log(module);
  return null;
};

class Modules extends PureComponent {
  render() {
    const { modules, openModal } = this.props;

    return modules.length > 0 ? modules.map(renderModule) : <EmptyState openModal={openModal} />;
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