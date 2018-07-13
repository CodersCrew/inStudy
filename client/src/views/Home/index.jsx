import React, { PureComponent } from 'react';
import Typist from 'react-typist';
import { withRouter } from 'react-router-dom';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, Filler, Header } from './style';

@withRouter
export default class Home extends PureComponent {
  state = {
    headerIndex: 0,
  };

  switchHeaderText = headerIndex => this.setState({ headerIndex });

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => this.switchHeaderText(headerIndex));
  };

  renderHeader = index => (
    <Header onTypingDone={this.dryRender}>
      <Typist.Delay ms={300} />
      {headerTexts[index]}
      <Typist.Backspace count={headerTexts[index].length} delay={3000} />
    </Header>
  );

  renderText = index => (index === -1 ? <Filler>|</Filler> : this.renderHeader(index));

  render() {
    return (
      <Container src="/img/landing.jpg">
        <Middle>
          <Supheader>Dołącz do najaktywniejszych studentów i</Supheader>
          {this.renderText(this.state.headerIndex)}
          <Search />
        </Middle>
      </Container>
    );
  }
}
