import React, { PureComponent } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Input, Icon } from './styles';

@connect(
  ({ ui, router }) => ({ size: ui.size, query: router.location.search.split('query=')[1] }),
  { push },
)
class Search extends PureComponent {
  state = {
    value: this.props.query,
    querySnapshot: this.props.query,
  }

  static getDerivedStateFromProps = (props, state) => (props.query !== state.querySnapshot)
    ? { value: props.query, querySnapshot: props.query }
    : null;

  onChange = ({ target: { value } }) => this.setState({ value });

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.onSearch();
    }
  };

  onSearch = () => this.props.push(`/inicjatywy${this.state.value ? `/?query=${this.state.value}` : ''}`);

  render() {
    const placeholder =
      this.props.size.value > 768
        ? 'Napisz, czym się interesujesz. Resztę pozostaw nam ;)'
        : 'Napisz, czym się interesujesz';
    const value = this.state.value || '';

    return (
      <Container>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyDown}
        />
        <Icon className="fal fa-search" onClick={this.onSearch} />
      </Container>
    );
  }
}

Search.propTypes = {
  size: object.isRequired,
  query: string,
  push: func.isRequired,
};

Search.defaultProps = {
  query: '',
};

export default Search;
