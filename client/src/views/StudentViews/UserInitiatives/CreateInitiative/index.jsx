import React, { PureComponent, Fragment } from 'react';
import { func, bool } from 'prop-types';
import { withCloseAnimation } from 'hocs';
import InitialModal from './Initial';
import CreationTypeModal from './CreationType';
import DetailsModal from './Details';
import SuccessModal from './Success';
import RecoveryModal from './Recovery';

@withCloseAnimation
class CreateInitiative extends PureComponent {
  state = {
    step: this.props.visible ? 0 : null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.visible && state.step === null) {
      return { step: 0 };
    }

    if (!props.visible && state.step !== null) {
      return { step: null };
    }

    return null;
  }

  incrementStep = (number = 1) => this.setState(({ step }) => ({ step: step + number }));

  decrementStep = (number = 1) => this.setState(({ step }) => ({ step: step - number }));

  render() {
    const { step } = this.state;
    const { closeModal } = this.props;

    return (
      <Fragment>
        <InitialModal visible={step === 0} incrementStep={this.incrementStep} closeModal={closeModal} />
        <CreationTypeModal visible={step === 1} incrementStep={this.incrementStep} closeModal={closeModal} />
        <DetailsModal visible={step === 2} incrementStep={this.incrementStep} decrementStep={this.decrementStep} />
        <SuccessModal visible={step === 3} closeModal={closeModal} />
        <RecoveryModal visible={step === 4} closeModal={closeModal} />
      </Fragment>
    );
  }
}

CreateInitiative.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
};

CreateInitiative.defaultProps = {
  visible: false,
};

export default CreateInitiative;
