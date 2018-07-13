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
  size = getViewportSize();

  componentDidMount() {
    window.addEventListener('resize', () => {
      const size = getViewportSize();
      if (this.size !== size.name) {
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
