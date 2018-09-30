import React, { PureComponent } from 'react';

const sliceHex = (color, start, stop) => parseInt(color.substring(start, stop), 16);

const shadeToDecimal = (color, percent) => parseInt(color * (100 + percent) / 100, 10);

const removeOverplus = color => (color < 255) ? color : 255;

const parseToHex = color => (color.toString(16).length === 1) ? `0${color.toString(16)}` : color.toString(16);

const shadeColor = (color, percent) => {
  const [R, G, B] = [sliceHex(color, 1, 3), sliceHex(color, 3, 5), sliceHex(color, 5, 7)]
    .map(hex => shadeToDecimal(hex, percent))
    .map(removeOverplus)
    .map(parseToHex);

  return `#${R}${G}${B}`;
};

const withCustomColor = WrappedComponent =>
  class Wrapper extends PureComponent {
    constructor(props) {
      super(props);
      this.colorToSet = 'var(--primary2)';
    }

    componentDidMount() {
      this.changeCustomColor();
    }

    componentDidUpdate() {
      this.changeCustomColor();
    }

    componentWillUnmount() {
      document.body.style.setProperty('--customColor', 'var(--primary1)');
      document.body.style.setProperty('--customColor-hover', 'var(--primary1-hover)');
      document.body.style.setProperty('--customColor-active', 'var(--primary1-active)');
    }

    getInitiativeColor = () => {
      if (Object.keys(this.props).includes('initiative') && this.props.initiative) {
        return this.props.initiative.color;
      }

      const { shortUrl } = this.props.match.params;
      return this.props.auth?.initiatives?.find(initiative => initiative.shortUrl === shortUrl).color;
    }

    getStudentColor = () => {
      if (this.props?.match?.params?.userId && this.props.user) {
        return this.props.user.color;
      }

      return this.props.auth?.color;
    }

    changeCustomColor = () => {
      const { pathname } = this.props.location;
      const currentCustomColor = getComputedStyle(document.body).getPropertyValue('--customColor');

      if (pathname.split('/')[1] === 'inicjatywy') {
        this.colorToSet = this.getInitiativeColor(currentCustomColor, pathname);
      } else if (pathname.split('/')[1] === 'student') {
        this.colorToSet = this.getStudentColor(currentCustomColor, pathname);
      }

      if (this.colorToSet && this.colorToSet !== currentCustomColor) {
        document.body.style.setProperty('--customColor', this.colorToSet);
        document.body.style.setProperty('--customColor-hover', shadeColor(this.colorToSet, 20));
        document.body.style.setProperty('--customColor-active', shadeColor(this.colorToSet, -10));
      }
    };


    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withCustomColor;
