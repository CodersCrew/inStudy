import React, { PureComponent, Fragment } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from '../../store/actions';
import { StyledIndex } from './styles';

import Navbar from '../../components/Navbar';
import UIObserver from '../../components/UIObserver';

import Home from '../Home';
import Initiatives from '../Initiatives';
import InitiativeProfile from '../InitiativeProfile';

@connect(
  null,
  actions,
)
class App extends PureComponent {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <StyledIndex
          notifications
          before={
            <Fragment>
              <UIObserver />
              <Navbar />
            </Fragment>
          }
          fa={__FONT_AWESOME__}
          bodyClassName="mainBody"
        >
          <Switch>
            <Route path="/inicjatywy/:initiative" component={InitiativeProfile} />
            <Route path="/inicjatywy" component={Initiatives} />
            <Route exact path="/" component={Home} />
          </Switch>
        </StyledIndex>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: func.isRequired,
};

export default App;
