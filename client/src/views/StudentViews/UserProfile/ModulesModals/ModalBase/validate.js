export default ({ icon, title }) => {
  const errors = {};

  if (!icon) {
    errors.icon = 'Icon cannot be empty';
  }

  if (!title) {
    errors.title = 'Title cannot be empty';
  }

  return errors;
};

export const required = value => !!value;
