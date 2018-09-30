import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import { getFontAwesome, notificationsTheme } from 'utils';
import NotificationsSystem from 'reapop';
import Raven from 'raven-js';

import * as actions from '../../store/actions';
import { Container, Body } from './styles';

import Navbar from '../../components/Navbar';
import UIObserver from '../../components/UIObserver';

import Home from '../Home';
import StudentViews from '../StudentViews';
import InitiativeViews from '../InitiativeViews';
import Page404 from '../Page404';
import FAQ from '../FAQ';
import Contact from '../Contact';
import Registration from '../Registration';
import AboutProject from '../AboutProject';

@connect(
  null,
  actions,
)
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.isFontAwesomeLoaded = false;
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidCatch(error) {
    Raven.captureException(error);
  }

  render() {
    if (!this.isFontAwesomeLoaded) {
      this.isFontAwesomeLoaded = getFontAwesome(__FONT_AWESOME__, this.isFontAwesomeLoaded);
    }

    return (
      <ConnectedRouter history={this.props.history}>
        <Container>
          <UIObserver />
          <Navbar />
          <Body>
            <Scrollbars>
              <Switch>
                <Route path="/inicjatywy" component={InitiativeViews} />
                <Route path="/student/profil" component={StudentViews} />
                <Route path="/student" component={StudentViews} />
                <Route path="/rejestracja" component={Registration} />
                <Route path="/faq/:name" component={FAQ} />
                <Route path="/o-projekcie" component={AboutProject} />
                <Route path="/kontakt" component={Contact} />
                <Route exact path="/" component={Home} />
                <Route path="/" component={Page404} />
              </Switch>
            </Scrollbars>
          </Body>
          <NotificationsSystem theme={notificationsTheme} />
        </Container>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  fetchUser: func.isRequired,
};

export default App;
