import React, { PureComponent, Fragment } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { getMoreInitiatives, getInitiatives } from 'store/actions';
import Home from '../../Home';
import InitiativesList from './InitiativesList';

@connect(
  ({ router, initiatives }) => ({
    initiatives,
    query: router.location.search.split('query=')[1],
  }),
  { getMoreInitiatives, getInitiatives },
)
class Initiatives extends PureComponent {
  constructor(props) {
    super(props);
    props.getInitiatives({ query: props.query, page: 0 });

    this.state = {
      clickedCardIndex: null,
    };
  }

  handleWaypointEnter = () => {
    const { initiatives } = this.props;
    this.props.getMoreInitiatives({ ...initiatives, page: initiatives.page + 1 });
  };

  handleCardClick = clickedCardIndex => this.setState({ clickedCardIndex });

  render() {
    const { initiatives } = this.props;

    return (
      <Fragment>
        <Home />
        <InitiativesList
          initiatives={initiatives.items}
          handleCardClick={this.handleCardClick}
          clickedCardIndex={this.state.clickedCardIndex}
          waypoint={() => initiatives.items.length % 10 === 0 && <Waypoint onEnter={this.handleWaypointEnter} />}
        />
      </Fragment>
    );
  }
}

Initiatives.propTypes = {
  getInitiatives: func,
  getMoreInitiatives: func,
  initiatives: object,
  query: string,
};

Initiatives.defaultProps = {
  getInitiatives: () => {},
  getMoreInitiatives: () => {},
  initiatives: {},
  query: '',
};

export default Initiatives;
