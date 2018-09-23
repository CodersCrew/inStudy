import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import InitiativeNav from './InitiativeNav';
import InitiativePublicProfile from './InitiativePublicProfile';
import InitiativePrivateProfile from './InitiativePrivateProfile';
import Initiatives from './Initiatives';
import Members from './Members';
import { Container } from './styles';

const InitiativeViews = ({ location: { pathname } }) => {
  const pathnameArr = pathname.split('/');
  const isProfile =
    pathnameArr[1] === 'inicjatywy' && ['profil', 'czlonkowie', 'projekty', 'rekrutacja'].includes(pathnameArr[3]);
  const isSingleView = pathnameArr.length === 3;
  console.log(1111);

  return (
    <Fragment>
      {isProfile && <InitiativeNav />}
      <Container isProfile={isProfile} isSingleView={isSingleView}>
        <Switch>
          <Route
            path="/inicjatywy/:shortUrl/profil"
            component={InitiativePrivateProfile}
          />
          <Route path="/inicjatywy/:shortUrl/czlonkowie" component={Members} />
          <Route
            path="/inicjatywy/:shortUrl/projekty"
            component={() => (
              <div>projekty</div>
            )}
          />
          <Route
            path="/inicjatywy/:shortUrl/rekrutacja"
            component={() => (
              <div>rekrutacja</div>
            )}
          />
          <Route path="/inicjatywy/:shortUrl" component={InitiativePublicProfile} />
          <Route exact path="/inicjatywy" component={Initiatives} />
        </Switch>
      </Container>
    </Fragment>
  );
};

InitiativeViews.propTypes = {
  location: object.isRequired,
};

export default InitiativeViews;
