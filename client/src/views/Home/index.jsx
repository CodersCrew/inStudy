import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import Typist from 'react-typist';
import { connect } from 'react-redux';
import { Spring } from 'react-spring';
import headerTexts from './headerTexts';
import { initiativesRoutes, getSpringContainerProps, getSpringHeaderProps } from './animations';
import Search from './Search';
import { Container, Middle, Supheader, HeaderWrapper, Header } from './styles';

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
              <Search key="search" />
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
