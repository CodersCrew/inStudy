import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Spring } from 'react-spring';
import Typed from 'typed.js';
import headerTexts from './headerTexts';
import { initiativesRoutes, getSpringContainerProps, getSpringHeaderProps } from './animations';
import Search from './Search';
import { Container, Middle, Supheader, HeaderWrapper } from './styles';

const TypedHeader = ({ springHeaderProps }) => (
  <Spring {...springHeaderProps} key="header">
    {styles => (
      <HeaderWrapper style={styles}>
        <span id="Home__header" />
      </HeaderWrapper>
    )}
  </Spring>
);

@connect(state => ({ uiHistory: state.ui.history }))
class Home extends PureComponent {
  constructor(props) {
    super(props);

    const { previousPath, currentPath } = this.props.uiHistory;

    this.isLanding = currentPath === '/';
    this.springContainerProps = getSpringContainerProps({ previousPath, currentPath });
    this.springHeaderProps = getSpringHeaderProps({ previousPath, currentPath });
    this.supheader = initiativesRoutes.includes(currentPath)
      ? 'Odnajdź najlepszą inicjatywę dla siebie'
      : 'Dołącz do najaktywniejszych studentów i';
  }

  componentDidMount() {
    this.typed = new Typed('#Home__header', {
      strings: headerTexts,
      typeSpeed: 45,
      backSpeed: 45,
      backDelay: 2000,
    });
  }

  render() {
    return (
      <Spring {...this.springContainerProps}>
        {styles => (
          <Container src="/img/landing.jpg" style={styles} isLanding={this.isLanding}>
            <Middle>
              <Supheader key="supheader">{this.supheader}</Supheader>
              <TypedHeader springHeaderProps={this.springHeaderProps} />
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
