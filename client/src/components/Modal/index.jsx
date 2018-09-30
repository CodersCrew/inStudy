import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { omit } from 'utils';
import { incrementModalsCount, decrementModalsCount } from 'store/actions';
import ComplexModal from './ComplexModal';
import ConfirmationModal from './ConfirmationModal';
import EmptyModal from './EmptyModal';

const hocs = compose(
  connect(null, { incrementModalsCount, decrementModalsCount }),
  lifecycle({
    componentDidMount() {
      this.props.incrementModalsCount();
    },
    componentWillUnmount() {
      this.props.decrementModalsCount();
    },
  }),
);

const Modal = (props) => {
  const modalProps = omit(props, ['type']);
  const { type } = props;

  switch (type) {
    case 'confirmation':
      return <ConfirmationModal {...modalProps} />;
    case 'empty':
      return <EmptyModal {...modalProps} />;
    default:
      return <ComplexModal {...modalProps} />;
  }
};

Modal.propTypes = {
  type: string,
};

Modal.defaultProps = {
  type: 'complex',
};

export default hocs(Modal);
