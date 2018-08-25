import React, { PureComponent, Fragment } from 'react';
import { func } from 'prop-types';
import InitialModal from './Initial';
import CreationTypeModal from './CreationType';
import DetailsModal from './Details';

class CreateInitiative extends PureComponent {
  state = {
    step: 0,
  };

  incrementStep = (number = 1) => this.setState(({ step }) => ({ step: step + number }));

  decrementStep = (number = 1) => this.setState(({ step }) => ({ step: step - number }));

  render() {
    return (
      <Fragment>
        <InitialModal
          visible={this.state.step === 0}
          incrementStep={this.incrementStep}
          closeModal={this.props.closeModal}
        />
        <CreationTypeModal
          visible={this.state.step === 1}
          incrementStep={this.incrementStep}
          closeModal={this.props.closeModal}
        />
        <DetailsModal
          visible
          incrementStep={this.incrementStep}
          decrementStep={this.decrementStep}
        />
      </Fragment>
    );
  }
}

CreateInitiative.propTypes = {
  closeModal: func.isRequired,
};

export default CreateInitiative;
