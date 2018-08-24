import React, { Component } from 'react';
import { Container } from './styles';

const createBackground = () => {
  let refreshDuration = 10000;
  let refreshTimeout;
  let numPointsX;
  let numPointsY;
  let unitWidth;
  let unitHeight;
  let points;

  const onLoad = () => {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    document.querySelector('#bg').appendChild(svg);

    var unitSize = (window.innerWidth + window.innerHeight) / 20;
    numPointsX = Math.ceil(window.innerWidth / unitSize) + 1;
    numPointsY = Math.ceil(window.innerHeight / unitSize) + 1;
    unitWidth = Math.ceil(window.innerWidth / (numPointsX - 1));
    unitHeight = Math.ceil(window.innerHeight / (numPointsY - 1));

    points = [];

    for (var y = 0; y < numPointsY; y++) {
      for (var x = 0; x < numPointsX; x++) {
        points.push({
          x: unitWidth * x,
          y: unitHeight * y,
          originX: unitWidth * x,
          originY: unitHeight * y,
        });
      }
    }

    randomize();

    for (let i = 0; i < points.length; i++) {
      if (
        points[i].originX != unitWidth * (numPointsX - 1) &&
        points[i].originY != unitHeight * (numPointsY - 1)
      ) {
        const topLeftX = points[i].x;
        const topLeftY = points[i].y;
        const topRightX = points[i + 1].x;
        const topRightY = points[i + 1].y;
        const bottomLeftX = points[i + numPointsX].x;
        const bottomLeftY = points[i + numPointsX].y;
        const bottomRightX = points[i + numPointsX + 1].x;
        const bottomRightY = points[i + numPointsX + 1].y;

        const rando = Math.floor(Math.random() * 2);

        for (let n = 0; n < 2; n++) {
          const polygon = document.createElementNS(svg.namespaceURI, 'polygon');

          if (rando == 0) {
            if (n == 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute(
                'points',
                topLeftX +
                  ',' +
                  topLeftY +
                  ' ' +
                  bottomLeftX +
                  ',' +
                  bottomLeftY +
                  ' ' +
                  bottomRightX +
                  ',' +
                  bottomRightY,
              );
            } else if (n == 1) {
              polygon.point1 = i;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute(
                'points',
                topLeftX +
                  ',' +
                  topLeftY +
                  ' ' +
                  topRightX +
                  ',' +
                  topRightY +
                  ' ' +
                  bottomRightX +
                  ',' +
                  bottomRightY,
              );
            }
          } else if (rando == 1) {
            if (n == 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + 1;
              polygon.setAttribute(
                'points',
                topLeftX +
                  ',' +
                  topLeftY +
                  ' ' +
                  bottomLeftX +
                  ',' +
                  bottomLeftY +
                  ' ' +
                  topRightX +
                  ',' +
                  topRightY,
              );
            } else if (n == 1) {
              polygon.point1 = i + numPointsX;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute(
                'points',
                bottomLeftX +
                  ',' +
                  bottomLeftY +
                  ' ' +
                  topRightX +
                  ',' +
                  topRightY +
                  ' ' +
                  bottomRightX +
                  ',' +
                  bottomRightY,
              );
            }
          }
          polygon.setAttribute('fill', 'rgba(0,0,0,' + Math.random() / 3 + ')');
          const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
          animate.setAttribute('fill', 'freeze');
          animate.setAttribute('attributeName', 'points');
          animate.setAttribute('dur', refreshDuration + 'ms');
          animate.setAttribute('calcMode', 'linear');
          polygon.appendChild(animate);
          svg.appendChild(polygon);
        }
      }
    }

    refresh();
  };

  function randomize() {
    for (let i = 0; i < points.length; i++) {
      if (points[i].originX != 0 && points[i].originX != unitWidth * (numPointsX - 1)) {
        points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2;
      }
      if (points[i].originY != 0 && points[i].originY != unitHeight * (numPointsY - 1)) {
        points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2;
      }
    }
  }

  function refresh() {
    randomize();
    if (document.querySelector('#bg svg')) {
      for (let i = 0; i < document.querySelector('#bg svg').childNodes.length; i++) {
        const polygon = document.querySelector('#bg svg').childNodes[i];
        const animate = polygon.childNodes[0];
        if (animate.getAttribute('to')) {
          animate.setAttribute('from', animate.getAttribute('to'));
        }
        animate.setAttribute(
          'to',
          `${points[polygon.point1].x},${points[polygon.point1].y} ${points[polygon.point2].x},${
            points[polygon.point2].y
          } ${points[polygon.point3].x}, ${points[polygon.point3].y}`,
        );
        animate.beginElement();
      }
    }
    refreshTimeout = setTimeout(function() {
      refresh();
    }, refreshDuration);
  }

  function onResize() {
    document.querySelector('#bg svg').remove();
    clearTimeout(refreshTimeout);
    onLoad();
  }

  onLoad();
  window.onresize = onResize;
};

class TriangleBackground extends Component {
  componentDidMount() {
    createBackground();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Container id="bg" />;
  }
}

export default TriangleBackground;
