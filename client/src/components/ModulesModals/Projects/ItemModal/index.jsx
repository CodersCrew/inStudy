import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Modal } from 'components';
import { Input, ImagePicker, RichText, SingleSelect } from 'components/reduxFormFields';
import { required, url } from 'utils/validators';
import { omit } from 'utils';
import socials from 'data/socials';
import { Container, TrashIcon, Label, Socials, Images, Overlay } from './styles';

const socialsOptions = Object.keys(socials).map(key => ({ label: socials[key].name, value: key }));

const areAllFieldsFilled = fields => fields
  && fields.reduce((acc, curr) => acc && curr && (curr.socialType || curr.url || curr.image), true);

@reduxForm({ form: 'projectItemForm' })
class ItemModal extends PureComponent {
  constructor(props) {
    super(props);

    if (Object.keys(props.itemData).length) {
      this.props.initialize(omit(props.itemData, ['index']));
    }
  }

  onSubmit = (values) => {
    this.props.onSubmit(values, this.props.itemData.index);
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
      <Socials>
        <Label>Social media</Label>
        {fields.map((social, index) =>
          this.renderSocialInput(social, index, index !== lastSocialIndex && fields.remove))}
      </Socials>
    );
  };

  renderImageOverlay = (remove, index) => remove
    ? (
      <Overlay preview={remove} onClick={(e) => { e.stopPropagation(); remove(index); }}>
        <i className="fal fa-trash-alt" />
      </Overlay>
    )
    : <Overlay preview={remove}><i className="fal fa-plus" /></Overlay>

  renderImageField = (rfName, index, remove) => (
    <div>
      <Field
        key={rfName}
        name={`${rfName}.image`}
        component={ImagePicker}
        props={{ overlay: () => this.renderImageOverlay(remove, index), aspect: 16 / 9, width: 1280 }}
      />
    </div>
  );

  renderImages = ({ fields = [] }) => {
    const fieldsValues = fields.getAll();
    const lastImageIndex = fields.length - 1;

    if (fields.length === 0 || areAllFieldsFilled(fieldsValues)) {
      fields.push({});
    }

    return (
      <Images>
        <Label>Galeria projektu</Label>
        {fields.map((rfName, index) =>
          this.renderImageField(rfName, index, index !== lastImageIndex && fields.remove))}
      </Images>
    );
  };

  render() {
    return (
      <Modal
        type="complex"
        onCancel={this.props.onClose}
        visible={this.props.visible}
        title="Dodaj projekt"
        iconClass="fal fa-grip-horizontal"
        width={644}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: 'Dodaj projekt',
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
            props={{ label: 'Zdjęcie główne', aspect: 16 / 9, width: 1280 }}
            validate={[required]}
          />
          <Field
            name="name"
            component={Input}
            props={{ label: 'Nazwa projektu' }}
            validate={[required]}
          />
          <Field
            name="header"
            component={Input}
            props={{ label: 'Nagłówek' }}
            validate={[required]}
          />
          <Field
            name="description"
            component={RichText}
            props={{ label: 'Opis projektu' }}
            validate={[required]}
          />
          <FieldArray name="socials" component={this.renderSocials} />
          <FieldArray name="images" component={this.renderImages} />
        </Container>
      </Modal>
    );
  }
}

ItemModal.propTypes = {
  initialize: func,
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  onSubmit: func.isRequired,
  itemData: object,
};

ItemModal.defaultProps = {
  initialize: () => {},
  visible: false,
  itemData: {},
};

export default ItemModal;
