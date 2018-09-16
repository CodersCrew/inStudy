import React, { PureComponent } from 'react';

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
      document.body.style.setProperty('--customColor', 'var(--primary2)');
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
      }
    };


    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withCustomColor;
