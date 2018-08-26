const validate = values => {
  const errors = {};
  if (!values.skills || !values.skills.length) {
    errors.skills= { _error: 'At least one skill must be entered' };
  } else {
    const skillsArrayErrors = [];
    values.skills.forEach((skill, skillIndex) => {
      const skillErrors = {};
      if (!skill || !skill.name) {
        skillErrors.name = 'To pole jest wymagane';
        skillsArrayErrors[skillIndex] = skillErrors;
      }
      if (!skill || !skill.level) {
        skillErrors.level = 'To pole jest wymagane';
        skillsArrayErrors[skillIndex] = skillErrors;
      }
    });
    if (skillsArrayErrors.length) {
      errors.skills = skillsArrayErrors;
    }
  }
  return errors;
};

export default validate;
