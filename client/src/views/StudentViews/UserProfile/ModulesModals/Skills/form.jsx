import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { NumberInput, Input } from 'components/reduxFormFields';
// import validate from './validate';

const renderSkills = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((skill, index) => (
      <li key={index}>
        <Field name={`${skill}.name`}
        type="text" component={Input}
        label="Nazwa umiejętności" />
        <Field
          name={`${skill}.level`}
          type="number"
          component={NumberInput}
          label="Poziom"
          props={{ label: 'Poziom', name: 'level', min: 0, max: 100, step: 1, suffix: '%' }}
        />
      </li>
    ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add skill
      </button>
    </li>
  </ul>
);

const FieldsArrayForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="skills" component={renderSkills} />
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  // validate
})(FieldsArrayForm)
