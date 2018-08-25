import React, { PureComponent } from 'react';
import { bool, func, number } from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal } from 'components';
import { Input, Select } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import texts from './texts';
import { Container } from './styles';

const sendCitiesRequest = () => axios.get('/api/cities');

const sendCategoriesRequest = () => axios.get('/api/category');

const sendUniversitiesRequest = cityId => axios.get(`/api/cities/universities/${cityId}`);

const addInitiativeRequest = initiativeData => axios.post('/api/initiative', initiativeData);

const mapResponseToOptions = responseArray =>
  responseArray.map(({ _id, name }) => ({ label: name, value: _id }));

const valueSelector = formValueSelector('newInitiativeDetails');

const hasCityChanged = (previousCityId, newCityId) => previousCityId !== newCityId;

@connect(state => ({ city: valueSelector(state, 'city') }))
@reduxForm({ form: 'newInitiativeDetails' })
class Details extends PureComponent {
  state = {
    cities: [],
    universities: [],
    categories: [],
  };

  componentDidMount() {
    sendCitiesRequest().then(({ data }) => this.setState({ cities: mapResponseToOptions(data) }));
    sendCategoriesRequest().then(({ data }) =>
      this.setState({ categories: mapResponseToOptions(data) }),
    );
  }

  componentDidUpdate(prevProps) {
    if (hasCityChanged(prevProps.city, this.props.city)) {
      this.fetchUniversities();
    }
  }

  fetchUniversities = () =>
    sendUniversitiesRequest(this.props.city).then(({ data }) => {
      const universities = mapResponseToOptions(data);
      this.updateUniversities(universities);
    });

  updateUniversities = universities => {
    this.setState({ universities });
    this.props.change('university', universities[0].value);
  };

  onSubmit = values => {
    console.log(values);
    addInitiativeRequest(values).then(res => {
      console.log(res);
      this.props.incrementStep(1);
    });
  };

  render() {
    const { visible, decrementStep } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={() => decrementStep(1)}
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
            name="facebookUrl"
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
  decrementStep: func.isRequired,
  handleSubmit: func.isRequired,
  change: func.isRequired,
  city: number,
};

Details.defaultProps = {
  visible: false,
  city: null,
};

export default Details;
