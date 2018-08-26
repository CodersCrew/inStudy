const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export const required = value =>
  value || typeof value === 'number' ? undefined : 'To pole jest wymagane';

export const maxLength = maxCharactersCount => value =>
  value?.length > maxCharactersCount
    ? `Tekst nie może być dłuższy niż ${maxCharactersCount} znaków`
    : undefined;

export const url = value => (urlRegExp.test(value) ? undefined : 'Błędny adres URL');
