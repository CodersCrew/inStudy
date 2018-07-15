import React, { PureComponent } from 'react';
import { bool, object } from 'prop-types';
import Typist from 'react-typist';
import { withSearch } from 'react-ui-framework/lib/services/search';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, Filler, Header } from './styles';

@withSearch
class Home extends PureComponent {
  state = {
    headerIndex: 0,
    resized: this.props.resized,
  };

  switchHeaderText = headerIndex => this.setState({ headerIndex });

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => this.switchHeaderText(headerIndex));
  };

  onSearch = () => {
    const { search } = window.location;
    this.props.history.push('/inicjatywy');
    this.props.history.replace(`/inicjatywy/${search}`);
  };

  renderHeader = index =>
    !this.props.resized && (
      <Header onTypingDone={this.dryRender} className="header">
        <Typist.Delay ms={300} />
        {headerTexts[index]}
        <Typist.Backspace count={headerTexts[index].length} delay={3000} />
      </Header>
    );

  renderText = index => (index === -1 ? <Filler>|</Filler> : this.renderHeader(index));

  render() {
    const { headerIndex, resized, hideHeader } = this.state;

    return (
      <Container src="/img/landing.jpg" resized={resized}>
        <Middle hideHeader={hideHeader}>
          <Supheader visible>Dołącz do najaktywniejszych studentów i</Supheader>
          {this.renderText(headerIndex)}
          <Search onSearch={this.onSearch} />
        </Middle>
      </Container>
    );
  }
}

Home.propTypes = {
  resized: bool,
  history: object.isRequired,
};

Home.defaultProps = {
  resized: false,
};

export default Home;
