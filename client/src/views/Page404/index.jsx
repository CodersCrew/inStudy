import React, { PureComponent, Fragment } from 'react';
import { Portal } from 'react-portal';
import VideoCover from 'react-background-video-player';
import { Link } from 'react-router-dom';
import { Container, Error, Description } from './styles';

export default class Page404 extends PureComponent {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.player.video.playbackRate = 0.5;
    this.player.play();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  render() {
    return (
      <Fragment>
        <Portal>
          <VideoCover
            containerWidth={this.state.windowWidth}
            containerHeight={this.state.windowHeight}
            src="/video/404.mp4"
            style={{ zIndex: 11000 }}
            ref={(p) => {
              this.player = p;
            }}
          />
        </Portal>
        <Container>
          <Error>404</Error>
          <Description>Niestety, strona której szukasz nie istnieje 😑</Description>
          <Link className="ant-btn ant-btn-lg ant-btn-background-ghost" to="/">
            Wróć na stronę główną
          </Link>
        </Container>
      </Fragment>
    );
  }
}
