import React, { PureComponent } from 'react';
import { object, func, oneOf, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import { withSearch } from 'CC-UI/lib/services/search';
import { getInitiatives } from '../../../store/actions';
import { Container, Input, Icon } from './styles';

@withSearch
@connect(
  ({ ui, search, initiatives }) => ({ size: ui.size, search, page: initiatives.page }),
  { getInitiatives },
)
class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    const { query } = props.search;

    if (props.page === false) {
      props.getInitiatives({ query });
    }

    this.state = {
      value: query,
      valueFromProps: query,
    };
  }

  static getDerivedStateFromProps(np, ps) {
    const { query } = np.search;
    return query !== ps.valueFromProps ? { value: query, valueFromProps: query } : null;
  }

  onChange = ({ target: { value } }) => this.setState({ value });

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.onSearch();
    }
  };

  onSearch = () => {
    this.props.setSearch({ query: this.state.value });
    window.resizeHomeDown = this.props.location.pathname === '/';
    const { getInitiatives, onSearch } = this.props;
    onSearch();
    getInitiatives({ query: this.state.value, page: 0 });
  };

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
  getInitiatives: func.isRequired,
  onEnterPress: func,
  onSearch: func,
  page: oneOf([bool, number]),
  search: object.isRequired,
  setSearch: func.isRequired,
  size: object.isRequired,
};

SearchBar.defaultProps = {
  onEnterPress: () => {},
  onSearch: () => {},
};

export default SearchBar;
