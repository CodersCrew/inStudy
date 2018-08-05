import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { NotificationsSystem, theme } from 'react-ui-framework/lib/services/notifications';
import * as actions from '../../store/actions';
import { Container, Body } from './styles';

import { getFontAwesome } from 'utils';

import Navbar from '../../components/Navbar';
import UIObserver from '../../components/UIObserver';

import Home from '../Home';
import Initiatives from '../Initiatives';
import InitiativeProfile from '../InitiativeProfile';
import StudentViews from '../StudentViews';

let isFontAwesomeLoaded = false;

@connect(
  null,
  actions,
)
class App extends PureComponent {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    if (!isFontAwesomeLoaded) {
      isFontAwesomeLoaded = getFontAwesome(__FONT_AWESOME__, isFontAwesomeLoaded);
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
                <Route exact path="/" component={Home} />
              </Switch>
            </Scrollbars>
          </Body>
          <NotificationsSystem theme={theme} />
        </Container>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: func.isRequired,
};

export default App;
