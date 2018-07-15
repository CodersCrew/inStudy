import React, { PureComponent } from 'react';
import { bool, object } from 'prop-types';
import Typist from 'react-typist';
import { connect } from 'react-redux';
import { withSearch } from 'react-ui-framework/lib/services/search';
import { Transition } from 'react-transition-group';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, Header } from './styles';

@withSearch
@connect(state => ({ uiHistory: state.ui.history }))
class Home extends PureComponent {
  constructor(props) {
    super(props);
    const { previousPath } = props.uiHistory;

    if (previousPath === '/') {
      this.state = { headerIndex: 0, isLanding: false };
      setTimeout(() => this.setState({ isLanding: true }), 0);
    } else if (previousPath === '/inicjatywy/' && !window.disableHomeAnimation) {
      this.state = { headerIndex: 0, isLanding: true };
      setTimeout(() => this.setState({ isLanding: false }), 0);
    } else {
      this.state = { headerIndex: 0, isLanding: !props.listView };
    }
    window.disableHomeAnimation = false;
  }

  switchHeaderText = headerIndex => this.setState({ headerIndex });

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => this.switchHeaderText(headerIndex));
  };

  onSearch = () => {
    window.disableHomeAnimation = true;
    if (this.state.isLanding) {
      this.setState({ isLanding: false }, () => {
        window.setTimeout(() => {
          this.props.history.push(`/inicjatywy/${window.location.search}`);
        }, 600);
      });
    }
  };

  renderHeader = index => (
    <Transition in={this.state.isLanding} timeout={600} unmountOnExit>
      {state => (
        <Header onTypingDone={this.dryRender} className={state}>
          <Typist.Delay ms={300} />
          {headerTexts[index]}
          <Typist.Backspace count={headerTexts[index].length} delay={3000} />
        </Header>
      )}
    </Transition>
  );

  renderText = index => (index === -1 ? '|' : this.renderHeader(index));

  render() {
    const { headerIndex, isLanding } = this.state;

    return (
      <Transition in={isLanding} timeout={600}>
        {state => (
          <Container src="/img/landing.jpg" isLanding={!isLanding} className={state}>
            <Middle>
              <Supheader>Dołącz do najaktywniejszych studentów i</Supheader>
              {this.renderText(headerIndex)}
              <Search onSearch={this.onSearch} />
            </Middle>
          </Container>
        )}
      </Transition>
    );
  }
}

Home.propTypes = {
  listView: bool,
  resized: bool,
  history: object.isRequired,
  uiHistory: object.isRequired,
};

Home.defaultProps = {
  listView: false,
  resized: false,
};

export default Home;
