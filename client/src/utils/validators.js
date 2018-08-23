export const required = value =>
  value || typeof value === 'number' ? undefined : 'To pole jest wymagane';
