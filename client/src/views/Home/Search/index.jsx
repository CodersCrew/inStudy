import React, { PureComponent } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input, Icon } from './styles';

@connect(
  ({ ui, router }) => ({ size: ui.size, query: router.location.search.split('query=')[1] }),
)
class SearchBar extends PureComponent {
  state = {
    value: this.props.query,
  }

  onChange = ({ target: { value } }) => this.setState({ value });

  onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.onSearch(this.state.value);
    }
  };

  onSearch = () => {
    this.props.onSearch(this.state.value);
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
  onSearch: func.isRequired,
  size: object.isRequired,
  query: string,
};

SearchBar.defaultProps = {
  query: '',
};

export default SearchBar;
