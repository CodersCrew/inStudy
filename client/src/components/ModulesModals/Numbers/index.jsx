import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FieldArray, Field, getFormSyncErrors } from 'redux-form';
import { Input } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Row, TrashButton } from './styles';

@connect(state => ({
  errors: getFormSyncErrors('moduleModal')(state),
}))
class Numbers extends PureComponent {
  renderNumberRow = (rfName, index, fields) => {
    const isLast = fields.getAll().length - 1 === index;
    const validate = isLast ? [] : [required];

    return (
      <Row>
        <Field name={`${rfName}.number`} component={Input} props={{ label: 'Liczba', type: 'number' }} validate={validate} />
        <Field name={`${rfName}.title`} component={Input} props={{ label: 'Tytuł/opis' }} validate={validate} />
        {!isLast && <TrashButton onClick={() => fields.remove(index)} />}
      </Row>
    );
  }

  renderNumbers = ({ fields }) => {
    const allFields = fields.getAll() || [];
    const allValues = allFields.filter(field => field?.number && field?.title);

    if (fields.length === 0 || allFields.length === allValues.length) {
      fields.push({});
    }

    return fields.map(this.renderNumberRow);
  };

  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Liczby">
        <FieldArray name="items" component={this.renderNumbers} />
      </ModalBase>
    );
  }
}

export default Numbers;
