import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from '../../actions';
import { StyledIndex } from './styles';

import Home from '../../views/Home';

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
        <StyledIndex notifications fa={__FONT_AWESOME__} bodyClassName="mainBody">
          <Switch>
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
