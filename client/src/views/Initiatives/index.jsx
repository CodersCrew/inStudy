import React, { PureComponent, Fragment } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import Home from '../Home';
import InitiativesList from './InitiativesList';

@connect(state => ({ initiatives: state.initiatives }))
class Initiatives extends PureComponent {
  render() {
    return (
      <Fragment>
        <Home listView />
        <InitiativesList initiatives={this.props.initiatives.items} />
      </Fragment>
    );
  }
}

Initiatives.propTypes = {
  text: string,
};

Initiatives.defaultProps = {
  text: 'Hello World',
};

export default Initiatives;
