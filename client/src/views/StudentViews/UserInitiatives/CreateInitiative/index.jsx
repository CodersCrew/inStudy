import React, { PureComponent, Fragment } from 'react';
import { func } from 'prop-types';
import InitialModal from './Initial';
import CreationTypeModal from './CreationType';
import DetailsModal from './Details';
import SuccessModal from './Success';

class CreateInitiative extends PureComponent {
  state = {
    step: 0,
  };

  incrementStep = (number = 1) => this.setState(({ step }) => ({ step: step + number }));

  decrementStep = (number = 1) => this.setState(({ step }) => ({ step: step - number }));

  render() {
    const { step } = this.state;
    const { closeModal } = this.props;

    return (
      <Fragment>
        <InitialModal
          visible={step === 0}
          incrementStep={this.incrementStep}
          closeModal={closeModal}
        />
        <CreationTypeModal
          visible={step === 1}
          incrementStep={this.incrementStep}
          closeModal={closeModal}
        />
        <DetailsModal
          visible={step === 2}
          incrementStep={this.incrementStep}
          decrementStep={this.decrementStep}
        />
        <SuccessModal visible={step === 3} closeModal={closeModal} />
      </Fragment>
    );
  }
}

CreateInitiative.propTypes = {
  closeModal: func.isRequired,
};

export default CreateInitiative;
