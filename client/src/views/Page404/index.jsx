import React, { PureComponent, Fragment } from 'react';
import { Portal } from 'react-portal';
import VideoCover from 'react-background-video-player';
import { Button } from 'antd';
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

  backHome = () => this.props.history.push('/inicjatywy');

  render() {
    return (
      <Fragment>
        <Portal>
          <VideoCover
            containerWidth={this.state.windowWidth}
            containerHeight={this.state.windowHeight}
            src="/video/404.mp4"
            style={{ zIndex: 11000 }}
            ref={p => {
              this.player = p;
            }}
          />
        </Portal>
        <Container>
          <Error>404</Error>
          <Description>Nie znaleźliśmy inicjatywy, której szukasz 😑</Description>
          <Button onClick={this.backHome} size="large" ghost>
            Odkryj inne inicjatywy
          </Button>
        </Container>
      </Fragment>
    );
  }
}
