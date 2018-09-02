import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TriangleBackground from 'components/TriangleBackground';
import { withAuth } from 'hocs';
import InitiativeNav from './InitiativeNav';
import InitiativePublicProfile from './InitiativePublicProfile';
import InitiativePrivateProfile from './InitiativePrivateProfile';
import Initiatives from './Initiatives';
import { Container } from './styles';

const InitiativeViews = ({ location: { pathname } }) => {
  const isProfile = pathname.includes('profil');

  return (
    <Fragment>
      {isProfile && <InitiativeNav />}
      <Container isProfile={isProfile}>
        <Switch>
          <Route
            path="/inicjatywy/:shortUrl/profil"
            component={withAuth(['authorizedUser'])(InitiativePrivateProfile)}
          />
          <Route path="/inicjatywy/:shortUrl" component={InitiativePublicProfile} />
          <Route exact path="/inicjatywy" component={Initiatives} />
        </Switch>
      </Container>
      <TriangleBackground />
    </Fragment>
  );
};

InitiativeViews.propTypes = {
  location: object.isRequired,
};

export default InitiativeViews;
