export default ({ description }) => {
  const errors = {};

  if (!description) {
    errors.description = 'Description cannot be empty';
  }

  return errors;
};
