import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withSearch } from 'react-ui-framework/lib/services/search';
import { Container, Input, Icon } from './style';

@withSearch
@connect(({ ui }) => ({ ui }))
class SearchBar extends PureComponent {
  state = {
    value: this.props.search.query,
    valueFromProps: this.props.search.query,
  };

  static getDerivedStateFromProps(np, ps) {
    const { query } = np.search;
    return query !== ps.valueFromProps ? { value: query, valueFromProps: query } : null;
  }

  onChange = ({ target: { value } }) => this.setState({ value });

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      console.log('search');
      this.props.setSearch({ query: this.state.value });
    }
  };

  render() {
    const placeholder =
      this.props.ui.size.value > 768
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
        <Icon className="fal fa-search" />
      </Container>
    );
  }
}

SearchBar.propTypes = {
  search: object.isRequired,
  setSearch: func.isRequired,
  ui: object.isRequired,
};

export default SearchBar;
