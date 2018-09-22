import React, { PureComponent } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Input, Icon } from './styles';

@connect(
  ({ ui, router }) => ({ size: ui.size, query: router.location.search.split('query=')[1] }),
  { push },
)
class SearchBar extends PureComponent {
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
      this.onSearch(this.state.value);
    }
  };

  onSearch = query => this.props.push(`/inicjatywy${query ? `/?query=${query}` : ''}`);

  render() {
    const placeholder =
      this.props.size.value > 768
        ? 'Napisz, czym się interesujesz. Resztę pozostaw nam ;)'
        : 'Napisz, czym się interesujesz';

    return (
      <Container>
        <Input
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onKeyDown}
        />
        <Icon className="fal fa-search" onClick={this.onSearch} />
      </Container>
    );
  }
}

SearchBar.propTypes = {
  onSearch: func.isRequired,
  size: object.isRequired,
  query: string,
};

SearchBar.defaultProps = {
  query: '',
};

export default SearchBar;
