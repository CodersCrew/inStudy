import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'CC-UI';
import { Input, Select } from 'components/reduxFormFields';
import texts from './texts';
import { Container } from './styles';

const cities = [{ label: 'Wrocław', value: 1 }, { label: 'Opole', value: 2 }];

const universities = {
  1: [
    { label: 'Uniwersytet Ekonomiczny we Wrocławiu', value: 1 },
    { label: 'Uniwersytet Wrocławski', value: 2 },
    { label: 'Politechnika Wrocławska', value: 3 },
    { label: 'Uniwersytet Przyrodniczy we Wrocławiu', value: 4 },
    { label: 'Uniwersytet SWPS we Wrocławiu', value: 5 },
    { label: 'Wysza Szkoła Bankowa we Wrocławiu', value: 6 },
  ],
  2: [
    { label: 'Politechnika Opolska', value: 7 },
    { label: 'Uniwersytet Opolski', value: 8 },
    { label: 'Państwowa Medyczna Wyższa Szkoła Zawodowa w Opolu', value: 9 },
  ],
};

const selector = formValueSelector('newInitiativeDetails');

@connect(state => ({ city: selector(state, 'city') }))
@reduxForm({ form: 'newInitiativeDetails', initialValues: { city: 1 } })
class Details extends PureComponent {
  render() {
    const { visible, decrementStep, incrementStep } = this.props;
    return (
      <Modal
        visible={visible}
        onClose={decrementStep}
        title={texts.modalTitle}
        icon="/fa-icons/clipboard-list-light.svg"
        type="complex"
        width={644}
        buttons={[
          {
            onClick: () => decrementStep(1),
            label: texts.cancelButton,
            kind: 'grey',
            ghost: true,
          },
          {
            onClick: () => incrementStep(1),
            label: texts.okButton,
          },
        ]}
      >
        <Container>
          <Field name="name" component={Input} props={{ label: 'Nazwa inicjatywy' }} />
          <Field name="email" component={Input} props={{ label: 'E-mail kontaktowy' }} />
          <Field name="city" component={Select} props={{ label: 'Miasto', items: cities }} />
          <Field
            name="university"
            component={Select}
            props={{ label: 'Miasto', items: universities[this.props.city] }}
          />
        </Container>
      </Modal>
    );
  }
}

Details.propTypes = {
  visible: bool,
  closeModal: func.isRequired,
  incrementStep: func.isRequired,
};

Details.defaultProps = {
  visible: false,
};

export default Details;
