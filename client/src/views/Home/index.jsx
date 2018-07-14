import React, { PureComponent, Fragment } from 'react';
import { bool, object } from 'prop-types';
import Typist from 'react-typist';
import { Transition } from 'react-transition-group';
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
    if (!this.state.resized) {
      this.setState({ resized: true }, () => {
        const { search } = window.location;
        window.setTimeout(() => {
          this.props.history.push('/inicjatywy');
          this.props.history.replace(`/inicjatywy/${search}`);
        }, 2000);
      });
    }
  };

  getSupheader = state => {
    if (state === 'entered') {
      return <Supheader visible>Dołącz do najaktywniejszych studentów i</Supheader>;
    } else if (state === 'entering') {
      return <Supheader visible={false}>Odnajdź najlepszą inicjatywę dla siebie</Supheader>;
    } else if (state === 'exited') {
      return <Supheader visible>Odnajdź najlepszą inicjatywę dla siebie</Supheader>;
    } else return <Supheader visible={false}>Dołącz do najaktywniejszych studentów i</Supheader>;
  };

  renderHeader = index => (
    <Transition in={!this.state.resized} timeout={1000} unmountOnExit>
      {state =>
        state === 'exited' ? null : (
          <Header onTypingDone={this.dryRender}>
            <Typist.Delay ms={300} />
            {headerTexts[index]}
            <Typist.Backspace count={headerTexts[index].length} delay={3000} />
          </Header>
        )
      }
    </Transition>
  );

  renderSupHeader = () => (
    <Fragment>
      <Transition in={!this.state.resized} timeout={300}>
        {state => this.getSupheader(state)}
      </Transition>
    </Fragment>
  );

  renderText = index => (index === -1 ? <Filler>|</Filler> : this.renderHeader(index));

  render() {
    const { headerIndex, resized } = this.state;

    return (
      <Container src="/img/landing.jpg" resized={resized}>
        <Middle resized={resized}>
          {this.renderSupHeader()}
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
