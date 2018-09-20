import React, { PureComponent, Fragment } from 'react';
import { FieldArray, Field } from 'redux-form';
import { Input, InputNumber } from 'components/reduxFormFields';
import { required } from 'utils/validators';
import { getModalBaseData } from '../userModalsUtils';
import ModalBase from '../ModalBase';
import { Row, TrashButton } from './styles';

const formatter = value => String(value).includes('%') ? value : `${value}%`;
const parser = value => value.replace('%', '');

class Skills extends PureComponent {
  renderSkillRow = (rfName, index, fields) => {
    const isLast = fields.getAll().length - 1 === index;
    const validate = isLast ? [] : [required];

    return (
      <Row>
        <Field name={`${rfName}.name`} component={Input} props={{ label: 'Nazwa umiejętności' }} validate={validate} />
        {!isLast && (
          <Fragment>
            <Field
              name={`${rfName}.value`}
              component={InputNumber}
              props={{ label: 'Poziom', min: 0, max: 100, step: 10, precision: 0, formatter, parser }}
            />
            <TrashButton onClick={() => fields.remove(index)} />
          </Fragment>
        )}
      </Row>
    );
  }

  renderSkills = ({ fields }) => {
    const allFields = fields.getAll() || [];
    const allValues = allFields.filter(({ name }) => name);

    if (fields.length === 0 || allFields.length === allValues.length) {
      fields.push({ value: 0 });
    }

    return fields.map(this.renderSkillRow);
  };

  render() {
    return (
      <ModalBase {...getModalBaseData(this.props)} contentHeader="Lista umiejętności">
        <FieldArray name="skills" component={this.renderSkills} />
      </ModalBase>
    );
  }
}

export default Skills;
