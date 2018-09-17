import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { withSearch } from 'hocs';
import { connect } from 'react-redux';
import { getInitiatives } from '../../../store/actions';
import { Container, Input, SearchIcon } from './styles';

@withSearch
@connect(
  ({ search, initiatives }) => ({ search, page: initiatives.page }),
  { getInitiatives },
)
class Search extends PureComponent {
  constructor(props) {
    super(props);
    const { query } = props.search;

    this.state = {
      active: false,
      value: query,
      valueFromProps: query,
    };
  }

  static getDerivedStateFromProps(np, ps) {
    const { query } = np.search;
    return query !== ps.valueFromProps ? { value: query, valueFromProps: query } : null;
  }

  onChange = ({ target: { value } }) => this.setState({ value });

  toggle = () => {
    if (!this.state.active) {
      this.input.focus();
    }
    this.setState(state => ({ active: !state.active }));
  };

  close = () => {
    if (this.state.active) {
      this.input.blur();
    }
    this.setState({ active: false });
  };

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.props.setSearch({ query: this.state.value });
      this.onSearch();
    } else if (key === 'Escape' || key === 'Esc') {
      this.close();
    }
  };

  onSearch = () => {
    const { getInitiatives, history, location } = this.props;

    window.resizeHomeDown = location.pathname === '/';
    window.disableAnimation = true;

    if (location.pathname !== '/inicjatywy') {
      history.push(`/inicjatywy${window.location.search}`);
    }

    getInitiatives({ query: this.state.value, page: 0 });
  };

  render() {
    const { active, value } = this.state;

    return (
      <Container active={active}>
        <Input
          placeholder="Napisz, czym się interesujesz"
          innerRef={input => {
            this.input = input;
          }}
          onKeyDown={this.onKeyDown}
          value={value}
          onChange={this.onChange}
        />
        <SearchIcon active={active} onClick={this.toggle} />
      </Container>
    );
  }
}

Search.propTypes = {
  history: object.isRequired,
  location: object.isRequired,
  getInitiatives: func.isRequired,
  setSearch: func.isRequired,
  search: object.isRequired,
};

export default Search;
