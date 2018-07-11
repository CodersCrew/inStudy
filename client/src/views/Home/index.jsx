import React, { PureComponent } from 'react';
import Typist from 'react-typist';
import { withRouter } from 'react-router-dom';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, Filler, Header } from './style';

@withRouter
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      headerIndex: 0,
    };
  }

  switchHeaderText = headerIndex => {
    this.setState({ headerIndex });
  };

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => {
      this.switchHeaderText(headerIndex);
    });
  };

  renderHeader = headerIndex => {
    const text = headerTexts[headerIndex];

    return (
      <Header onTypingDone={this.dryRender}>
        <Typist.Delay ms={500} />
        {text}
        <Typist.Backspace count={text.length} delay={3000} />
      </Header>
    );
  };

  render() {
    return (
      <Container src="/img/landing.jpg">
        <Middle>
          <Supheader>Dołącz do najaktywniejszych studentów i</Supheader>
          {this.state.headerIndex === -1 ? (
            <Filler>|</Filler>
          ) : (
            this.renderHeader(this.state.headerIndex)
          )}
          <Search />
        </Middle>
      </Container>
    );
  }
}
