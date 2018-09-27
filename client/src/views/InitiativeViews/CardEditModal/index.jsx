import React, { PureComponent, Fragment } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateBasicInitiativeData } from 'store/actions';
import { Modal } from 'components';
import { Input, TextArea, ImagePicker, SingleSelect, ColorSelect } from 'components/reduxFormFields';
import { required, maxLength, url } from 'utils/validators';
import { socials, antdColors } from 'data';
import { withCloseAnimation } from 'hocs';
import { pick } from 'utils';
import { Container, Label, TrashIcon } from './styles';

const dataProperties = ['name', 'email', 'description', 'image', 'socials', 'facebookUrl', 'city', 'university', 'category', 'color'];

const maxDescriptionLength = maxLength(260);

const socialsOptions = Object.keys(socials).map(key => ({ label: socials[key].name, value: key }));

const areAllFieldsFilled = fields => fields.reduce((acc, { socialType, url }) => acc && (socialType || url), true);

const sendCitiesRequest = () => axios.get('/api/cities');

const sendCategoriesRequest = () => axios.get('/api/category');

const sendUniversitiesRequest = cityId => axios.get(`/api/cities/universities/${cityId}`);

const mapResponseToOptions = responseArray => responseArray.map(({ _id, name }) => ({ label: name, value: _id }));

const valueSelector = formValueSelector('cardEditModal');

const hasCityChanged = (previousCityId, newCityId) => previousCityId !== newCityId;

@withCloseAnimation
@reduxForm({ form: 'cardEditModal' })
@connect(
  state => ({ city: valueSelector(state, 'city') }),
  { updateBasicInitiativeData },
)
class CardEditModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      universities: [],
      categories: [],
      areUniversitiesFetching: false,
    };

    const initialData = pick(props.data, dataProperties);
    props.initialize(initialData);
  }

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

  onSubmit = (values) => {
    const parsedSocials = values.socials.filter(({ socialType, url }) => socialType && url);
    this.props.updateBasicInitiativeData({ ...values, socials: parsedSocials, initiativeId: this.props.data._id }, this.props.data._id);
    this.props.onClose();
  };

  renderSocialTypeSelect = social => (
    <Field
      name={`${social}.socialType`}
      component={SingleSelect}
      props={{
        noWrapper: true,
        options: socialsOptions,
        placeholder: 'Nazwa portalu',
        style: { width: 160 },
      }}
    />
  );

  renderSocialInput = (social, index, remove) => (
    <Field
      key={social}
      name={`${social}.url`}
      component={Input}
      props={{
        addonBefore: this.renderSocialTypeSelect(social),
        addonAfter: remove && <TrashIcon onClick={() => remove(index)} />,
        placeholder: 'Pełen adres URL',
      }}
      validate={remove ? [url] : []}
    />
  );

  renderSocials = ({ fields = [] }) => {
    const fieldsValues = fields.getAll();
    const lastSocialIndex = fields.length - 1;

    if (fields.length === 0 || areAllFieldsFilled(fieldsValues)) {
      fields.push({});
    }

    return (
      <Fragment>
        <Label>Social media</Label>
        {fields.map((social, index) =>
          this.renderSocialInput(social, index, index !== lastSocialIndex && fields.remove))}
      </Fragment>
    );
  };

  render() {
    const { areUniversitiesFetching, cities, universities, categories } = this.state;

    return (
      <Modal
        type="complex"
        visible={this.props.visible}
        onCancel={this.props.onClose}
        title="Edytuj swoje podstawowe dane"
        icon="fal fa-user-light"
        width={644}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: 'Aktualizuj dane',
            type: 'primary',
            loading: this.props.submitting,
          },
          {
            onClick: () => this.props.onClose(),
            label: 'Anuluj',
            disabled: this.props.submitting,
          },
        ]}
      >
        <Container>
          <Field
            name="image"
            component={ImagePicker}
            props={{ label: 'Zdjęcie profilowe', aspect: 1, width: 200 }}
            validate={[required]}
          />
          <Field name="name" component={Input} props={{ label: 'Nazwa inicjatywy' }} validate={[required]} />
          <Field name="email" component={Input} props={{ label: 'E-mail kontaktowy' }} validate={[required]} />
          <Field
            name="facebookUrl"
            component={Input}
            props={{ label: 'Adres fanpage na facebooku', disabled: this.props.submitting }}
            validate={[required, url]}
          />
          <Field
            name="city"
            component={SingleSelect}
            props={{ label: 'Miasto', options: cities, disabled: this.props.submitting }}
            validate={[required]}
          />
          <Field
            name="university"
            component={SingleSelect}
            props={{
              label: 'Uczelnia',
              options: universities,
              disabled: this.props.submitting || !this.props.city || areUniversitiesFetching,
              isValidating: areUniversitiesFetching,
            }}
            validate={[required]}
          />
          <Field
            name="color"
            component={ColorSelect}
            props={{ label: 'Kolor profilu', colorsList: antdColors }}
            validate={[required]}
          />
          <Field
            name="category"
            component={SingleSelect}
            props={{
              label: 'Obszar działalności',
              options: categories,
              disabled: this.props.submitting,
            }}
            validate={[required]}
          />
          <Field
            name="description"
            component={TextArea}
            props={{ label: 'Krótki opis' }}
            validate={[maxDescriptionLength]}
          />
          <FieldArray name="socials" component={this.renderSocials} />
        </Container>
      </Modal>
    );
  }
}

CardEditModal.propTypes = {
  handleSubmit: func.isRequired,
  initialize: func.isRequired,
  submitting: bool.isRequired,
  updateBasicInitiativeData: func.isRequired,
  data: object.isRequired,
  visible: bool,
  onClose: func.isRequired,
};

CardEditModal.defaultProps = {
  visible: false,
};

export default CardEditModal;
