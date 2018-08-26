import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { Li,StyledInputNumber, StyledInput, FieldsContainer, StyledField } from './styles';

const renderSkills = ({ fields}) => (

  <ul>
    {fields.map((skill, index) => (
      <Li key={index}>


      <FieldsContainer>
        <Field
          name={`${skill}.name`}
          type="text"
          component={StyledInput}
          label="Nazwa umiejętności" />
        <Field
          name={`${skill}.level`}
          type="number"
          component={StyledInputNumber}
          label="Poziom"
          props={{ label: 'Poziom', name: 'level', min: 0, max: 100, step: 1 }}
        />
         <button
          type="button"
          title="Remove Skill"
          onClick={() => fields.remove(index)}
        >-</button>
      </FieldsContainer>
      </Li>
    ))}
    <Li>
      <Field
        type="text" component={StyledInput}
        label="Nazwa umiejętności"
        onFocus={() => fields.push({})} />
    </Li>
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
  form: 'fieldArrays',
  validate
})(FieldsArrayForm)
