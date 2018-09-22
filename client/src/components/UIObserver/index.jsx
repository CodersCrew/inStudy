import { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setSize, setHistory } from '../../store/actions';
import { getViewportSize } from '../../utils';

@withRouter
@connect(
  state => ({ pathname: state.router.location.pathname }),
  { setSize, setHistory },
)
class UIObserver extends PureComponent {
  state = {
    history: {
      previousPath: '',
      currentPath: '',
    },
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pathname !== state.history.currentPath) {
      const history = {
        previousPath: state.history.currentPath,
        currentPath: props.pathname,
      };

      props.setHistory(history);

      return { history };
    }

    return null;
  }

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
  history: object.isRequired,
  setHistory: func.isRequired,
  setSize: func.isRequired,
};

export default UIObserver;
