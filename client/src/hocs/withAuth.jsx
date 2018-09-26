import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withNotifications } from 'hocs';

const withHocs = compose(
  withNotifications,
  connect(state => ({ auth: state.auth })),
);

const notyfyAuthError = notify => notify({
  title: 'Błąd autoryzacji',
  message: 'Aby przejść do poprzedniego widoku musisz być zalogowany.',
  status: 'warning',
});

const notifyInitiativeAuthError = notify => notify({
  title: 'Błąd autoryzacji',
  message: 'Nie posiadasz uprawnień do przeglądania prywatnego profilu inicjatywy, ponieważ nie jesteś jej członkiem.',
  status: 'warning',
});

const renderAuthInProgress = () => <div>Autoryzacja w toku...</div>;

const userProfileAuth = (WrappedComponent, props) => {
  if (props.auth === false) {
    notyfyAuthError(props.notify);
    return <Redirect to="/rejestracja" />;
  }

  if (props.auth === null) return renderAuthInProgress();

  return <WrappedComponent {...props} />;
};

const initiativeProfile = (WrappedComponent, props) => {
  if (props.auth === false) {
    notyfyAuthError(props.notify);
    return <Redirect to="/rejestracja" />;
  }

  if (props.auth === null) return renderAuthInProgress();

  if (!props.auth.initiatives.find(({ shortUrl }) => shortUrl === props.match.params.shortUrl)) {
    notifyInitiativeAuthError(props.notify);
    return <Redirect to={`/inicjatywy/${props.match.params.shortUrl}`} />;
  }

  return <WrappedComponent {...props} />;
};

const withAuth = authType => (WrappedComponent) => {
  const Component = (props) => {
    switch (authType) {
      case 'userProfile': {
        return userProfileAuth(WrappedComponent, props);
      }
      case 'initiativeProfile': {
        return initiativeProfile(WrappedComponent, props);
      }

      default: {
        console.error('You must specify authorization type');
        return null;
      }
    }
  };

  return withHocs(Component);
};

export default withAuth;
