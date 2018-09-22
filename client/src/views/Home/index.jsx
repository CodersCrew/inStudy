import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import Typist from 'react-typist';
import { connect } from 'react-redux';
import { Spring } from 'react-spring';
import { withSearch } from 'hocs';
import headerTexts from './headerTexts';
import Search from './Search';
import { Container, Middle, Supheader, HeaderWrapper, Header } from './styles';

const initiativesRoutes = ['/inicjatywy', '/inicjatywy/'];

const getSpringContainerProps = ({ previousPath, currentPath }) => {
  if (initiativesRoutes.includes(previousPath) && currentPath === '/') {
    return { from: { height: 280 }, to: { height: window.innerHeight - 40 } };
  }
  if (previousPath === '/' && initiativesRoutes.includes(currentPath)) {
    return { from: { height: window.innerHeight - 40 }, to: { height: 280 } };
  }
  if (!previousPath && currentPath === '/') {
    return { from: { height: window.innerHeight } };
  }
  if (!previousPath && initiativesRoutes.includes(currentPath)) {
    return { from: { height: 280 } };
  }
};

const getSpringHeaderProps = ({ previousPath, currentPath }) => {
  if (initiativesRoutes.includes(previousPath) && currentPath === '/') {
    return { from: { transform: 'scale(0)' }, to: { transform: 'scale(1)' } };
  }
  if (previousPath === '/' && initiativesRoutes.includes(currentPath)) {
    return { from: { transform: 'scale(1)' }, to: { transform: 'scale(0)' } };
  }
  if (!previousPath && currentPath === '/') {
    return { from: { transform: 'scale(1)' } };
  }
  if (!previousPath && initiativesRoutes.includes(currentPath)) {
    return { from: { transform: 'scale(0)' } };
  }
};

@withSearch
@connect(state => ({ uiHistory: state.ui.history }))
class Home extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props.uiHistory);

    const { previousPath, currentPath } = this.props.uiHistory;

    this.state = {
      headerIndex: 0,
    };

    this.isLanding = currentPath === '/';
    this.springContainerProps = getSpringContainerProps({ previousPath, currentPath });
    this.springHeaderProps = getSpringHeaderProps({ previousPath, currentPath });
    this.supheader = initiativesRoutes.includes(currentPath)
      ? 'Odnajdź najlepszą inicjatywę dla siebie'
      : 'Dołącz do najaktywniejszych studentów i';
  }

  switchHeaderText = headerIndex => this.setState({ headerIndex });

  dryRender = () => {
    let { headerIndex } = this.state;
    headerIndex = headerIndex + 1 < headerTexts.length ? headerIndex + 1 : 0;
    this.setState({ headerIndex: -1 }, () => this.switchHeaderText(headerIndex));
  };

  onSearch = query => this.props.history.push(`/inicjatywy${query ? `/?query=${query}` : ''}`);

  renderHeader = index => (
    <Spring {...this.springHeaderProps} key="header">
      {styles => (
        <HeaderWrapper style={styles}>
          <Header onTypingDone={this.dryRender}>
            <Typist.Delay ms={300} />
            {headerTexts[index]}
            <Typist.Backspace count={headerTexts[index].length} delay={3000} />
          </Header>
        </HeaderWrapper>
      )}
    </Spring>
  );

  renderText = index => (index === -1 ? '|' : this.renderHeader(index));

  render() {
    const { headerIndex } = this.state;

    return (
      <Spring {...this.springContainerProps}>
        {styles => (
          <Container src="/img/landing.jpg" style={styles} isLanding={this.isLanding}>
            <Middle>
              <Supheader key="supheader">{this.supheader}</Supheader>
              {this.renderText(headerIndex)}
              <Search key="search" onSearch={this.onSearch} />
            </Middle>
          </Container>
        )}
      </Spring>
    );
  }
}

Home.propTypes = {
  history: object.isRequired,
  uiHistory: object,
};

Home.defaultProps = {
  uiHistory: {},
};

export default Home;
