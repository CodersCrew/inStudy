import React, { PureComponent, Fragment } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import Home from '../Home';
import { Container } from './styles';

@connect(state => ({ initiatives: state.initiatives }))
class Initiatives extends PureComponent {
  render() {
    console.log(this.props.initiatives.items);
    return (
      <Fragment>
        <Home resized />
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
