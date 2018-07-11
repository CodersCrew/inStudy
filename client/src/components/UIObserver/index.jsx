import { PureComponent } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { setSize } from '../../actions';
import { getViewportSize } from '../../utils';

@connect(
  null,
  { setSize },
)
class UIObserver extends PureComponent {
  constructor(props) {
    super(props);
    this.size = getViewportSize();
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const size = getViewportSize();
      if (this.size !== size.mane) {
        this.props.setSize(size);
        this.size = size.name;
      }
    });
  }

  render() {
    return null;
  }
}

UIObserver.propTypes = {
  setSize: func.isRequired,
};

export default UIObserver;
