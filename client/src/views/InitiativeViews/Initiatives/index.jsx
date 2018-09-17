import React, { PureComponent, Fragment } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { getMoreInitiatives } from 'store/actions';
import Home from '../../Home';
import InitiativesList from './InitiativesList';

@connect(
  state => ({ initiatives: state.initiatives }),
  { getMoreInitiatives },
)
class Initiatives extends PureComponent {
  handleWaypointEnter = () => {
    const { getMoreInitiatives, initiatives } = this.props;
    getMoreInitiatives({ ...initiatives, page: initiatives.page + 1 });
  };

  render() {
    const { initiatives } = this.props;

    return (
      <Fragment>
        <Home listView />
        <InitiativesList
          initiatives={initiatives.items}
          waypoint={() => initiatives.items.length % 10 === 0 && <Waypoint onEnter={this.handleWaypointEnter} />}
        />
      </Fragment>
    );
  }
}

Initiatives.propTypes = {
  getMoreInitiatives: func,
  initiatives: object,
};

Initiatives.defaultProps = {
  getMoreInitiatives: () => {},
  initiatives: {},
};

export default Initiatives;
