import React, { PureComponent } from 'react';
import { bool, func, number } from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'components';
import { Input, Select } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import texts from './texts';
import { Container } from './styles';

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

const getCities = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([{ label: 'Wrocław', value: 1 }, { label: 'Opole', value: 2 }]);
    }, 500);
  });

const getCategories = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: 'IT', value: 1 },
        { label: 'Medycyna', value: 2 },
        { label: 'Społeczne', value: 3 },
      ]);
    }, 500);
  });

const getUniversities = cityId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(universities[cityId]);
    }, 500);
  });

const selector = formValueSelector('newInitiativeDetails');

@connect(state => ({ city: selector(state, 'city') }))
@reduxForm({ form: 'newInitiativeDetails' })
class Details extends PureComponent {
  state = {
    cities: [],
    universities: [],
    categories: [],
  };

  componentDidMount() {
    getCities().then(cities =>
      this.setState({ cities }, () => {
        getUniversities(this.state.cities[0].value).then(universities =>
          this.setState({ universities }),
        );
      }),
    );
    getCategories().then(categories => this.setState({ categories }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      getUniversities(this.props.city).then(universities =>
        this.setState({ universities }, () => {
          this.props.change('university', universities[0].value);
        }),
      );
    }
  }

  onSubmit = values => console.log(values);

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
            onClick: this.props.handleSubmit(this.onSubmit),
            label: texts.okButton,
            type: 'primary',
          },
          {
            onClick: () => decrementStep(1),
            label: texts.cancelButton,
          },
        ]}
      >
        <Container>
          <Field
            name="name"
            component={Input}
            props={{ label: 'Nazwa inicjatywy', fullWidth: true }}
            validate={[required]}
          />
          <Field
            name="email"
            component={Input}
            props={{ label: 'E-mail kontaktowy', fullWidth: true }}
            validate={[required]}
          />
          <Field
            name="city"
            component={Select}
            props={{ label: 'Miasto', options: this.state.cities }}
            validate={[required]}
          />
          <Field
            name="university"
            component={Select}
            props={{ label: 'Uczelnia', options: this.state.universities }}
            validate={[required]}
          />
          <Field
            name="category"
            component={Select}
            props={{ label: 'Obszar działalności', options: this.state.categories }}
            validate={[required]}
          />
          <Field
            name="facebook"
            component={Input}
            props={{ label: 'Adres fanpage na facebooku', fullWidth: true }}
            validate={[required]}
          />
          <Field
            name="description"
            component={Input}
            props={{ label: 'Krótki opis inicjatywy (do 260 znaków)', fullWidth: true }}
            validate={[required]}
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
  change: func.isRequired,
  city: number,
};

Details.defaultProps = {
  visible: false,
  city: null,
};

export default Details;
