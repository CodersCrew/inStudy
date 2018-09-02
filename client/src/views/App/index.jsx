import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { notificationsTheme } from 'utils';
import NotificationsSystem from 'reapop';
import * as actions from '../../store/actions';
import { Container, Body } from './styles';

import { getFontAwesome } from 'utils';

import Navbar from '../../components/Navbar';
import UIObserver from '../../components/UIObserver';

import Home from '../Home';
import Initiatives from '../Initiatives';
import InitiativeProfile from '../InitiativeProfile';
import StudentViews from '../StudentViews';
import Page404 from '../Page404';
import FAQ from '../FAQ';
import Registration from '../Registration';
import Policy from '../Registration/Policy';
import Statute from '../Registration/Statute';

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

  render() {
    if (!this.isFontAwesomeLoaded) {
      this.isFontAwesomeLoaded = getFontAwesome(__FONT_AWESOME__, this.isFontAwesomeLoaded);
    }

    return (
      <BrowserRouter>
        <Container>
          <UIObserver />
          <Navbar />
          <Body>
            <Scrollbars>
              <Switch>
                <Route path="/inicjatywy/:initiative" component={InitiativeProfile} />
                <Route path="/inicjatywy" component={Initiatives} />
                <Route path="/student/profil" component={StudentViews} />
                <Route path="/student" component={StudentViews} />
                <Route path="/rejestracja" component={Registration} />
                <Route path="/polityka_prywatnosci" component={Policy} />
                <Route path="/regulamin" component={Statute} />
                <Route path="/faq/:name" component={FAQ} />
                <Route exact path="/" component={Home} />
                <Route path="/" component={Page404} />
              </Switch>
            </Scrollbars>
          </Body>
          <NotificationsSystem theme={notificationsTheme} />
        </Container>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: func.isRequired,
};

export default App;
