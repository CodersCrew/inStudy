import { PureComponent } from 'react';
import { func } from 'prop-types';
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

    this.setHistory(this.props.history.location.pathname);
    this.props.history.listen(e => {
      this.setHistory(e.pathname);
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

  setHistory = newPath => {
    this.history = {
      previousPath: this?.history?.actualPath || '',
      actualPath: newPath,
    };
    this.props.setHistory(this.history);
  };

  render() {
    return null;
  }
}

UIObserver.propTypes = {
  setSize: func.isRequired,
};

export default UIObserver;
