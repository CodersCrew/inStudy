import React from 'react';
import { notify } from 'reapop';
import { connect } from 'react-redux';

export default WrappedComponent => {
  const Component = connect(
    null,
    { notify },
  )(WrappedComponent);

  const ComponentWithNotifications = props => <Component {...props} />;

  return ComponentWithNotifications;
};
