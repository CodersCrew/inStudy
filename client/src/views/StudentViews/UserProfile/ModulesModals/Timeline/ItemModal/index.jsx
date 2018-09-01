import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { ComplexModal } from 'components';
import { Input, TextArea, MonthPicker } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { omit } from 'utils';
import { Container, Actual } from './styles';

@reduxForm({ form: 'historyItemForm' })
class ItemModal extends PureComponent {
  constructor(props) {
    super(props);

    if (Object.keys(props.itemData).length) {
      const { from: initialFrom, to: initialTo } = props.itemData;
      const from = initialFrom ? moment(initialFrom, 'MM-YYYY') : undefined;
      const to = initialTo.includes('-') ? moment(initialTo, 'MM-YYYY') : initialTo;

      this.props.initialize({ ...omit(props.itemData, ['index']), from, to });
    }
  }

  onSubmit = values => {
    const valuesToSave = {
      ...values,
      from: values.from.format('MM-YYYY'),
      to: typeof values.to === 'string' ? values.to : values.to.format('MM-YYYY'),
    };

    this.props.onSubmit(valuesToSave, this.props.itemData.index);
    this.props.onClose();
  };

  setActual = closePicker => {
    this.props.change('to', 'obecnie');
    closePicker();
  };

  renderActualButton = closePicker => <Actual onClick={() => this.setActual(closePicker)}>Nadal trwa</Actual>;

  render() {
    return (
      <ComplexModal
        onCancel={this.props.onClose}
        visible={this.props.visible}
        title="Dodaj element do osi czasu"
        icon="fal fa-history"
        width={644}
        buttons={[
          {
            onClick: this.props.handleSubmit(this.onSubmit),
            label: 'Dodaj',
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
          <Field name="from" component={MonthPicker} props={{ label: 'Data (od)' }} validate={[required]} />
          <Field
            name="to"
            component={MonthPicker}
            props={{ label: 'Data (do)', renderExtraFooter: this.renderActualButton }}
            validate={[required]}
          />
          <Field
            name="title"
            component={Input}
            props={{ label: 'Tytuł', placeholder: 'np. zajmowane stanowisko, kierunek studiów' }}
            validate={[required]}
          />
          <Field
            name="subtitle"
            component={Input}
            props={{ label: 'Podtytuł', placeholder: 'np. nazwa firmy, nazwa uczelni' }}
          />
          <Field
            name="description"
            component={TextArea}
            props={{ label: 'Opis', placeholder: 'np. opis stanowiska, kierunku studiów' }}
            validate={[required]}
          />
        </Container>
      </ComplexModal>
    );
  }
}

ItemModal.propTypes = {
  change: func.isRequired,
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  visible: bool,
  onSubmit: func.isRequired,
  itemData: object,
};

ItemModal.defaultProps = {
  visible: false,
  itemData: {},
};

export default ItemModal;
