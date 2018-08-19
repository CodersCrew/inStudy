export default {
  icon: {
    type: 'IconPicker',
    extend: {
      label: 'Ikona',
      fullWidth: true,
    },
  },
  title: {
    type: 'Input',
    extend: {
      label: 'Tytuł modułu',
      fullWidth: true,
    },
    validation: {
      required: {
        message: 'Tytuł jest polem wymaganym',
      },
    },
  },
};
