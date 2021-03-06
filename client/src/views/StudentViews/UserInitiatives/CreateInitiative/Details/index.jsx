import React, { PureComponent } from 'react';
import { bool, func, number } from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal } from 'components';
import { Input, SingleSelect, TextArea } from 'components/reduxFormFields';
import { required, maxLength, url, isFacebookUrl } from 'utils/validators';
import { addUserInitiative } from 'store/actions';
import { withCloseAnimation } from 'hocs';
import { antdColors } from 'data';
import texts from './texts';
import { Container } from './styles';

const sendCitiesRequest = () => axios.get('/api/cities');

const sendCategoriesRequest = () => axios.get('/api/category');

const sendUniversitiesRequest = cityId => axios.get(`/api/cities/universities/${cityId}`);

const mapResponseToOptions = responseArray => responseArray.map(({ _id, name }) => ({ label: name, value: _id }));

const valueSelector = formValueSelector('newInitiativeDetails');

const hasCityChanged = (previousCityId, newCityId) => previousCityId !== newCityId;

const maxDescriptionLength = maxLength(260);

@withCloseAnimation
@connect(
  state => ({ city: valueSelector(state, 'city') }),
  { addUserInitiative },
)
@reduxForm({ form: 'newInitiativeDetails' })
class Details extends PureComponent {
  state = {
    cities: [],
    universities: [],
    categories: [],
    areUniversitiesFetching: false,
  };

  componentDidMount() {
    sendCitiesRequest().then(({ data }) => this.setState({ cities: mapResponseToOptions(data) }));
    sendCategoriesRequest().then(({ data }) => this.setState({ categories: mapResponseToOptions(data) }));
  }

  componentDidUpdate(prevProps) {
    if (hasCityChanged(prevProps.city, this.props.city)) {
      this.fetchUniversities();
    }
  }

  fetchUniversities = () => {
    this.setState({ areUniversitiesFetching: true });
    sendUniversitiesRequest(this.props.city).then(({ data }) => {
      const universities = mapResponseToOptions(data);
      this.updateUniversities(universities);
    });
  };

  updateUniversities = (universities) => {
    this.setState({ universities, areUniversitiesFetching: false });
    this.props.change('university', universities[0].value);
  };

  onSubmit = async (values) => {
    try {
      const color = antdColors[Math.floor(Math.random() * (antdColors.length - 1))];
      const initiative = await this.props.addUserInitiative({ ...values, color });
      if (initiative) this.props.incrementStep(1);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { visible, decrementStep, submitting, city } = this.props;
    const { areUniversitiesFetching, cities, universities, categories } = this.state;

    return (
      <Modal
        type="complex"
        visible={visible}
        onCancel={() => decrementStep(1)}
        title={texts.modalTitle}
        icon="fal fa-clipboard-list"
        width={644}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: texts.okButton,
            type: 'primary',
            loading: submitting,
          },
          {
            onClick: () => decrementStep(1),
            label: texts.cancelButton,
            disabled: submitting,
          },
        ]}
      >
        <Container>
          <Field
            name="name"
            component={Input}
            props={{ label: 'Nazwa inicjatywy', disabled: submitting }}
            validate={[required]}
          />
          <Field
            name="email"
            component={Input}
            props={{ label: 'E-mail kontaktowy', disabled: submitting }}
            validate={[required]}
          />
          <Field
            name="city"
            component={SingleSelect}
            props={{ label: 'Miasto', options: cities, disabled: submitting }}
            validate={[required]}
          />
          <Field
            name="university"
            component={SingleSelect}
            props={{
              label: 'Uczelnia',
              options: universities,
              disabled: submitting || !city || areUniversitiesFetching,
              isValidating: areUniversitiesFetching,
            }}
            validate={[required]}
          />
          <Field
            name="category"
            component={SingleSelect}
            props={{
              label: 'Obszar działalności',
              options: categories,
              disabled: submitting,
            }}
            validate={[required]}
          />
          <Field
            name="facebookUrl"
            component={Input}
            props={{ label: 'Adres fanpage na facebooku', disabled: submitting }}
            validate={[required, url, isFacebookUrl]}
          />
          <Field
            name="description"
            component={TextArea}
            props={{ label: 'Krótki opis inicjatywy (do 260 znaków)', disabled: submitting }}
            validate={[required, maxDescriptionLength]}
          />
        </Container>
      </Modal>
    );
  }
}

Details.propTypes = {
  change: func.isRequired,
  city: number,
  closeModal: func.isRequired,
  decrementStep: func.isRequired,
  handleSubmit: func.isRequired,
  incrementStep: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  addUserInitiative: func.isRequired,
};

Details.defaultProps = {
  city: null,
  visible: false,
};

export default Details;
