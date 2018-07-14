import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withSearch } from 'react-ui-framework/lib/services/search';
import { getInitiatives } from '../../../actions';
import { Container, Input, Icon } from './styles';

@withSearch
@connect(
  ({ ui, search, initiatives }) => ({ ui, search, page: initiatives.page }),
  { getInitiatives },
)
class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.page === false) {
      this.props.getInitiatives({
        query: this.props.search.query,
      });
    }

    this.state = {
      value: this.props.search.query,
      valueFromProps: this.props.search.query,
    };
  }

  static getDerivedStateFromProps(np, ps) {
    const { query } = np.search;
    return query !== ps.valueFromProps ? { value: query, valueFromProps: query } : null;
  }

  onChange = ({ target: { value } }) => this.setState({ value });

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.props.setSearch({ query: this.state.value });
      this.onSearch();
    }
  };

  onSearch = () => {
    this.props.getInitiatives({
      query: this.props.search.query,
    });
    this.props.onSearch();
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
  onEnterPress: func,
  search: object.isRequired,
  setSearch: func.isRequired,
  ui: object.isRequired,
};

SearchBar.defaultProps = {
  onEnterPress: () => {},
};

export default SearchBar;
