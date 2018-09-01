import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import TriangleBackground from 'components/TriangleBackground';
import { withAuth } from 'hocs';
import UserNav from './UserNav';
import UserProfile from './UserProfile';
import UserInitiatives from './UserInitiatives';
import { Container } from './styles';

const StudentViews = () => (
  <Fragment>
    <UserNav />
    <Container>
      <Switch>
        <Route exact path="/student/profil" component={UserProfile} />
        <Route path="/student/profil/inicjatywy" component={UserInitiatives} />
        <Route path="/student/profil/wydarzenia" component={() => <div>wydarzenia</div>} />
        <Route path="/student/profil/osiagniecia" component={() => <div>osiągnięcia</div>} />
      </Switch>
    </Container>
    <TriangleBackground />
  </Fragment>
);

export default withAuth(['authorizedUser'])(StudentViews);
