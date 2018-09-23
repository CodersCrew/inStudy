import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import UserNav from './UserNav';
import UserPrivateProfile from './UserPrivateProfile';
import UserPublicProfile from './UserPublicProfile';
import UserInitiatives from './UserInitiatives';
import { Container } from './styles';

const StudentViews = ({ location: { pathname } }) => {
  const isProfile = pathname.includes('profil');

  return (
    <Fragment>
      {isProfile && <UserNav />}
      <Container isProfile={isProfile}>
        <Switch>
          <Route path="/student/profil/inicjatywy" component={UserInitiatives} />
          <Route path="/student/profil/wydarzenia" component={() => <div>wydarzenia</div>} />
          <Route path="/student/profil/osiagniecia" component={() => <div>osiągnięcia</div>} />
          <Route path="/student/profil" component={UserPrivateProfile} />
          <Route path="/student/:userId" component={UserPublicProfile} />
        </Switch>
      </Container>
    </Fragment>
  );
};

StudentViews.propTypes = {
  location: object.isRequired,
};

export default StudentViews;
