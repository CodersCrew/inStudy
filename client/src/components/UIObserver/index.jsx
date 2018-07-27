import { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setSize, setHistory } from '../../store/actions';
import { getViewportSize } from '../../utils';

@withRouter
@connect(
  null,
  { setSize, setHistory },
)
class UIObserver extends PureComponent {
  constructor(props) {
    super(props);

    this.size = getViewportSize();

    this.history = {};
    this.setPreviousPath(this.props.history.location.pathname);
    this.props.history.listen(e => {
      if (e.pathname !== this.previousPathHolder) this.setPreviousPath(e.pathname);
    });
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

  setPreviousPath = newPath => {
    if (newPath !== this.history.previousPath) {
      this.history.previousPath = newPath;
      this.props.setHistory(this.history);
    }
  };

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
