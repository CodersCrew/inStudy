import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withNotifications } from 'hocs';

const withHocs = compose(
  withNotifications,
  connect(state => ({ auth: state.auth })),
);

const withAuth = conditions => (WrappedComponent) => {
  if (conditions.includes('authorizedUser')) {
    const Component = (props) => {
      if (props.auth !== false) {
        return <WrappedComponent {...props} />;
      }

      setTimeout(() => {
        props.notify({
          title: 'Błąd autoryzacji',
          message: 'Aby zyskać dostęp do poprzedniej podstrony musisz być zalogowany.',
          status: 'info',
          dismissible: true,
          dismissAfter: 3000,
        });
      }, 1000);

      return <Redirect to="/rejestracja" />;
    };

    return withHocs(Component);
  } else if (conditions.includes('unauthorizedUser')) {
    const Component = props =>
      props.auth === false ? <WrappedComponent {...props} /> : <Redirect to="/student/profil" />;
    return withHocs(Component);
  }
};

export default withAuth;
