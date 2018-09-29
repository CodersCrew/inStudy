import React from 'react';
import PropTypes from 'prop-types';
import StyledSVG from './styles';

const SVGIcon = ({ src, width, height, fill, className }) => (
  <StyledSVG src={src} path={src} width={width} height={height} fill={fill} svgClassName={className} />
);

SVGIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SVGIcon.defaultProps = {
  className: '',
  fill: '',
  height: '',
  width: '',
};

export default SVGIcon;
