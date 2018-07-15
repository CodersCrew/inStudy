import React, { PureComponent } from 'react';
import { bool, object } from 'prop-types';
import Typist from 'react-typist';
import { connect } from 'react-redux';
import { withSearch } from 'react-ui-framework/lib/services/search';
import TransitionClass from '../../components/TransitionClass';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, Header } from './styles';

@withSearch
@connect(state => ({ uiHistory: state.ui.history }))
class Home extends PureComponent {
  state = {
    headerIndex: 0,
  };

  switchHeaderText = headerIndex => this.setState({ headerIndex });

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => this.switchHeaderText(headerIndex));
  };

  onSearch = () => {
    if (this.props.uiHistory.actualPath === '/') {
      const { search } = window.location;
      this.props.history.push(`/inicjatywy/${search}`);
    }
  };

  renderHeader = index => (
    <TransitionClass
      isShowed={this.props.uiHistory.actualPath === '/'}
      duration={300}
      animatedStart={
        this.props.uiHistory.previousPath === '/' &&
        this.props.uiHistory.actualPath.includes('inicjatywy')
      }
      unmountOnExit
    >
      {className => {
        console.log(className);
        return (
          <Header onTypingDone={this.dryRender} className={`header ${className}`}>
            <Typist.Delay ms={300} />
            {headerTexts[index]}
            <Typist.Backspace count={headerTexts[index].length} delay={3000} />
          </Header>
        );
      }}
    </TransitionClass>
  );

  renderText = index => (index === -1 ? '|' : this.renderHeader(index));

  render() {
    const { headerIndex } = this.state;

    return (
      <TransitionClass
        isShowed={this.props.uiHistory.actualPath === '/'}
        duration={1000}
        animatedStart={
          (this.props.uiHistory.previousPath === '/' && this.props.listView) ||
          (this.props.uiHistory.previousPath === '/inicjatywy/' && !this.props.listView)
        }
      >
        {className => {
          return (
            <Container
              src="/img/landing.jpg"
              className={className}
              resized={this.props.uiHistory.actualPath !== '/'}
            >
              <Middle>
                <Supheader>Dołącz do najaktywniejszych studentów i</Supheader>
                {this.renderText(headerIndex)}
                <Search onSearch={this.onSearch} />
              </Middle>
            </Container>
          );
        }}
      </TransitionClass>
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
