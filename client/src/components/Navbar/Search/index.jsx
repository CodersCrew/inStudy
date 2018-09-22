import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Input, SearchIcon } from './styles';

@connect(
  ({ router }) => ({ query: router.location.search.split('query=')[1] }),
  { push },
)
class Search extends PureComponent {
  state = {
    active: false,
    value: this.props.query,
    querySnapshot: this.props.query,
  };

  static getDerivedStateFromProps = (props, state) => (props.query !== state.querySnapshot)
    ? { value: props.query, querySnapshot: props.query }
    : null;

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
      console.log(this.state.value);
      this.onSearch(this.state.value);
    } else if (key === 'Escape' || key === 'Esc') {
      this.close();
    }
  };

  onSearch = query => this.props.push(`/inicjatywy${query ? `/?query=${query}` : ''}`);

  render() {
    const { active, value } = this.state;

    return (
      <Container active={active}>
        <Input
          placeholder="Napisz, czym się interesujesz"
          innerRef={(input) => { this.input = input; }}
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
  push: func.isRequired,
  query: string,
};

Search.defaultProps = {
  query: '',
};

export default Search;
