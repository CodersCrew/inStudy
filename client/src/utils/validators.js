export const required = value =>
  value || typeof value === 'number' ? undefined : 'To pole jest wymagane';

export const maxLength = maxCharactersCount => value =>
  value?.length > maxCharactersCount
    ? `Tekst nie może być dłuższy niż ${maxCharactersCount} znaków`
    : undefined;
