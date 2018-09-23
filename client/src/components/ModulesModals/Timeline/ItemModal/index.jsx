import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import moment from 'moment';
import { Modal } from 'components';
import { Input, TextArea, MonthPicker } from 'components/reduxFormFields';
import { required, isAfter, isBefore } from 'utils/validators';
import { omit } from 'utils';
import { Container, Actual } from './styles';

const valueSelector = formValueSelector('historyItemForm');

@reduxForm({ form: 'historyItemForm' })
@connect(state => ({ from: valueSelector(state, 'from'), to: valueSelector(state, 'to') }))
class ItemModal extends PureComponent {
  constructor(props) {
    super(props);
    this.isAfterDate = () => false;
    this.isBeforeDate = () => false;

    if (Object.keys(props.itemData).length) {
      const { from: initialFrom, to: initialTo } = props.itemData;
      const from = initialFrom ? moment(initialFrom, 'MM-YYYY') : undefined;
      const to = initialTo.includes('-') ? moment(initialTo, 'MM-YYYY') : initialTo;

      this.props.initialize({ ...omit(props.itemData, ['index']), from, to });
      this.isAfterDate = isAfter(props.from);
      this.isBeforeDate = isBefore(props.to);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.from !== this.props.from || prevProps.to !== this.props.to) {
      this.isAfterDate = isAfter(this.props.from);
      this.isBeforeDate = isAfter(this.props.to);
    }
  }

    onSubmit = (values) => {
      const valuesToSave = {
        ...values,
        from: values.from.format('MM-YYYY'),
        to: typeof values.to === 'string' ? values.to : values.to.format('MM-YYYY'),
      };

      this.props.onSubmit(valuesToSave, this.props.itemData.index);
      this.props.onClose();
    };

    setActual = (closePicker) => {
      this.props.change('to', 'obecnie');
      closePicker();
    };

    renderActualButton = closePicker => <Actual onClick={() => this.setActual(closePicker)}>Nadal trwa</Actual>;

    render() {
      return (
        <Modal
          type="complex"
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
            <Field
              name="from"
              component={MonthPicker}
              props={{ label: 'Data (od)' }}
              validate={[required, this.isBeforeDate]}
            />
            <Field
              name="to"
              component={MonthPicker}
              props={{ label: 'Data (do)', renderExtraFooter: this.renderActualButton }}
              validate={[required, this.isAfterDate]}
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
        </Modal>
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
