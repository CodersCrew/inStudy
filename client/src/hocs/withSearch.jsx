import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import queryString from 'query-string';
import { omit } from 'utils';
import { setSearch } from 'store/actions';

export default WrappedComponent => {
  @withRouter
  @connect(
    ({ search }) => ({ search }),
    { setSearch },
  )
  class WithSearch extends PureComponent {
    constructor(props) {
      super(props);
      if (this.props.location.search) {
        this.setSearch(queryString.parse(this.props.location.search));
      }
    }

    componentDidUpdate(pp) {
      const { history, location, search } = this.props;
      if (location.search !== pp.location.search) {
        this.setSearch(queryString.parse(location.search));
      }
      if (search !== pp.search) {
        const urlNewParams = search.query ? search : omit(['query'], search);
        history.push({
          pathname: location.pathname,
          search: queryString.stringify(urlNewParams),
        });
      }
    }

    isSearchUpdated = queryObj =>
      Object.keys(queryObj).reduce(
        (acc, key) => queryObj[key] !== this.props.search[key] || acc,
        false,
      );

    setSearch = queryObj => {
      if (this.isSearchUpdated(queryObj)) {
        this.props.setSearch(queryObj, this.props.history);
      }
    };

    render() {
      return <WrappedComponent {...this.props} setSearch={this.setSearch} />;
    }
  }

  return WithSearch;
};
